import {
  validateInquiry,
  type InquiryErrorCode,
  type InquiryRequest,
  type InquiryResponse
} from '@mengche/shared';

const JSON_HEADERS = { 'content-type': 'application/json; charset=utf-8' } as const;
const MAX_BODY_BYTES = 16 * 1024;
const TURNSTILE_TIMEOUT_MS = 5000;

type TurnstileResult = {
  success: boolean;
  hostname?: string;
  action?: string;
  'error-codes'?: string[];
};

function response(body: InquiryResponse, status: number, origin?: string): Response {
  const headers = new Headers(JSON_HEADERS);
  if (origin) {
    headers.set('access-control-allow-origin', origin);
    headers.set('access-control-allow-methods', 'POST, OPTIONS');
    headers.set('access-control-allow-headers', 'content-type');
    headers.set('vary', 'Origin');
  }
  return new Response(JSON.stringify(body), { status, headers });
}

function error(code: InquiryErrorCode, status: number, origin?: string): Response {
  return response({ ok: false, code }, status, origin);
}

function allowedOrigin(request: Request, env: Env): string | undefined {
  const origin = request.headers.get('origin') ?? undefined;
  if (!origin) return undefined;
  const allowed = env.ALLOWED_ORIGINS.split(',').map((value) => value.trim());
  return allowed.includes(origin) ? origin : undefined;
}

async function hashKey(secret: string, value: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(secret),
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  const signature = await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(value));
  return Array.from(new Uint8Array(signature), (byte) => byte.toString(16).padStart(2, '0')).join('');
}

async function verifyTurnstile(token: string, request: Request, env: Env): Promise<boolean> {
  const payload = new FormData();
  payload.set('secret', env.TURNSTILE_SECRET_KEY);
  payload.set('response', token);
  const remoteIp = request.headers.get('cf-connecting-ip');
  if (remoteIp) payload.set('remoteip', remoteIp);

  try {
    const result = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: payload,
      signal: AbortSignal.timeout(TURNSTILE_TIMEOUT_MS)
    });
    if (!result.ok) return false;

    const data = (await result.json()) as TurnstileResult;
    return (
      data.success === true &&
      data.hostname === env.EXPECTED_TURNSTILE_HOSTNAME &&
      data.action === env.EXPECTED_TURNSTILE_ACTION
    );
  } catch {
    return false;
  }
}

async function readBodyWithinLimit(request: Request): Promise<string | null> {
  if (!request.body) return '';

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return new TextDecoder().decode(body);
}

function escapeHtml(value: string): string {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    };
    return entities[character] ?? character;
  });
}

function formatInquiry(inquiry: InquiryRequest): { subject: string; text: string; html: string } {
  const rows = [
    ['Name', inquiry.name],
    ['Email', inquiry.email],
    ['Organization', inquiry.organization ?? '—'],
    ['Service', inquiry.service],
    ['Budget', inquiry.budget],
    ['Timeline', inquiry.timeline],
    ['Locale', inquiry.locale],
    ['Summary', inquiry.summary]
  ] as const;

  return {
    subject: `New MengChe Dev inquiry: ${inquiry.service}`,
    text: rows.map(([label, value]) => `${label}: ${value}`).join('\n\n'),
    html: `<h1>New website inquiry</h1><dl>${rows
      .map(([label, value]) => `<dt><strong>${escapeHtml(label)}</strong></dt><dd>${escapeHtml(value)}</dd>`)
      .join('')}</dl>`
  };
}

async function handleInquiry(request: Request, env: Env): Promise<Response> {
  const origin = allowedOrigin(request, env);
  if (request.headers.has('origin') && !origin) return error('invalid_request', 403);

  const contentType = request.headers.get('content-type') ?? '';
  if (!contentType.toLowerCase().startsWith('application/json')) return error('invalid_request', 415, origin);

  const declaredLength = Number(request.headers.get('content-length') ?? 0);
  if (declaredLength > MAX_BODY_BYTES) return error('invalid_request', 413, origin);

  const rawBody = await readBodyWithinLimit(request);
  if (rawBody === null) return error('invalid_request', 413, origin);

  const remoteIdentity = request.headers.get('cf-connecting-ip') ?? 'unknown';
  const ipKey = await hashKey(env.RATE_LIMIT_SECRET, `ip:${remoteIdentity}`);
  const ipLimit = await env.IP_LIMITER.limit({ key: ipKey });
  if (!ipLimit.success) return error('rate_limited', 429, origin);

  let input: unknown;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return error('invalid_request', 400, origin);
  }

  const validation = validateInquiry(input);
  if (!validation.ok) return error('invalid_request', 400, origin);

  const emailKey = await hashKey(env.RATE_LIMIT_SECRET, `email:${validation.value.email}`);
  const emailLimit = await env.EMAIL_LIMITER.limit({ key: emailKey });
  if (!emailLimit.success) return error('rate_limited', 429, origin);

  if (!(await verifyTurnstile(validation.value.turnstileToken, request, env))) {
    return error('verification_failed', 400, origin);
  }

  const message = formatInquiry(validation.value);
  try {
    await env.INQUIRY_EMAIL.send({
      from: env.EMAIL_FROM,
      to: env.EMAIL_TO,
      replyTo: validation.value.email,
      subject: message.subject,
      text: message.text,
      html: message.html
    });
  } catch (sendError) {
    console.error(
      JSON.stringify({
        event: 'inquiry_delivery',
        status: 'failed',
        reason: sendError instanceof Error ? sendError.name : 'unknown'
      })
    );
    return error('delivery_failed', 502, origin);
  }

  console.log(
    JSON.stringify({
      event: 'inquiry_delivery',
      status: 'sent',
      service: validation.value.service,
      locale: validation.value.locale
    })
  );
  return response({ ok: true }, 200, origin);
}

export default {
  async fetch(request, env): Promise<Response> {
    const url = new URL(request.url);
    const origin = allowedOrigin(request, env);

    if (request.method === 'OPTIONS') {
      if (!origin) return new Response(null, { status: 403 });
      const headers = new Headers();
      headers.set('access-control-allow-origin', origin);
      headers.set('access-control-allow-methods', 'POST, OPTIONS');
      headers.set('access-control-allow-headers', 'content-type');
      headers.set('access-control-max-age', '86400');
      headers.set('vary', 'Origin');
      return new Response(null, { status: 204, headers });
    }

    if (url.pathname !== '/v1/inquiries' || request.method !== 'POST') {
      return new Response('Not found', { status: 404 });
    }

    return handleInquiry(request, env);
  }
} satisfies ExportedHandler<Env>;
