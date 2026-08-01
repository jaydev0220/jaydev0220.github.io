import { afterEach, describe, expect, it, vi } from 'vitest';
import worker from './index';

const validInquiry = {
	name: 'Jay',
	email: 'jay@example.com',
	organization: 'Example',
	service: 'marketing-site',
	budget: '25000-49999',
	timeline: '1-2-months',
	summary: 'A sufficiently detailed project summary for the inquiry Worker.',
	locale: 'en',
	privacyConsent: true,
	turnstileToken: 'test-token'
};

function createEnv(options: { ipAllowed?: boolean; emailAllowed?: boolean; emailFails?: boolean } = {}): Env {
	return {
		ALLOWED_ORIGINS: 'https://www.mengche.dev',
		EXPECTED_TURNSTILE_HOSTNAME: 'www.mengche.dev',
		EXPECTED_TURNSTILE_ACTION: 'inquiry',
		EMAIL_FROM: 'contact@mengche.dev',
		EMAIL_TO: 'contact@mengche.dev',
		TURNSTILE_SECRET_KEY: 'secret',
		RATE_LIMIT_SECRET: 'rate-secret',
		IP_LIMITER: {
			limit: vi.fn().mockResolvedValue({ success: options.ipAllowed ?? true })
		},
		EMAIL_LIMITER: {
			limit: vi.fn().mockResolvedValue({ success: options.emailAllowed ?? true })
		},
		INQUIRY_EMAIL: {
			send: options.emailFails
				? vi.fn().mockRejectedValue(new Error('delivery failed'))
				: vi.fn().mockResolvedValue(undefined)
		}
	} as unknown as Env;
}

function inquiryRequest(body: unknown = validInquiry, origin = 'https://www.mengche.dev'): Request {
	return new Request('https://contact.mengche.dev/v1/inquiries', {
		method: 'POST',
		headers: {
			origin,
			'content-type': 'application/json',
			'cf-connecting-ip': '192.0.2.1'
		},
		body: JSON.stringify(body)
	});
}

function invoke(request: Request, env: Env): Promise<Response> {
	return worker.fetch(request as unknown as Parameters<typeof worker.fetch>[0], env);
}

async function responseBody(response: Response) {
	return (await response.json()) as { ok: boolean; code?: string };
}

afterEach(() => {
	vi.unstubAllGlobals();
});

describe('inquiry Worker', () => {
	it('rejects unsupported routes and methods', async () => {
		const response = await invoke(new Request('https://contact.mengche.dev/unknown'), createEnv());
		expect(response.status).toBe(404);
	});

	it('rejects unapproved origins', async () => {
		const response = await invoke(inquiryRequest(validInquiry, 'https://attacker.example'), createEnv());
		expect(response.status).toBe(403);
		expect(await responseBody(response)).toEqual({ ok: false, code: 'invalid_request' });
	});

	it('returns CORS headers for approved preflight requests', async () => {
		const response = await invoke(
			new Request('https://contact.mengche.dev/v1/inquiries', {
				method: 'OPTIONS',
				headers: { origin: 'https://www.mengche.dev' }
			}),
			createEnv()
		);
		expect(response.status).toBe(204);
		expect(response.headers.get('access-control-allow-origin')).toBe('https://www.mengche.dev');
		expect(response.headers.get('access-control-allow-methods')).toBe('POST, OPTIONS');
	});

	it('rejects request bodies larger than the configured limit', async () => {
		const response = await invoke(
			inquiryRequest({ ...validInquiry, summary: 'x'.repeat(20 * 1024) }),
			createEnv()
		);
		expect(response.status).toBe(413);
		expect(await responseBody(response)).toEqual({ ok: false, code: 'invalid_request' });
	});

	it('rejects malformed inquiry data before verification', async () => {
		const response = await invoke(inquiryRequest({ ...validInquiry, email: 'invalid' }), createEnv());
		expect(response.status).toBe(400);
		expect(await responseBody(response)).toEqual({ ok: false, code: 'invalid_request' });
	});

	it('enforces the coarse IP rate limit', async () => {
		const response = await invoke(inquiryRequest(), createEnv({ ipAllowed: false }));
		expect(response.status).toBe(429);
		expect(await responseBody(response)).toEqual({ ok: false, code: 'rate_limited' });
	});

	it('rejects failed Turnstile verification', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue(
				new Response(JSON.stringify({ success: false, 'error-codes': ['invalid-input-response'] }), {
					headers: { 'content-type': 'application/json' }
				})
			)
		);

		const response = await invoke(inquiryRequest(), createEnv());
		expect(response.status).toBe(400);
		expect(await responseBody(response)).toEqual({ ok: false, code: 'verification_failed' });
	});

	it('rejects a Turnstile response for the wrong hostname or action', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue(
				new Response(JSON.stringify({ success: true, hostname: 'attacker.example', action: 'other' }), {
					headers: { 'content-type': 'application/json' }
				})
			)
		);

		const response = await invoke(inquiryRequest(), createEnv());
		expect(response.status).toBe(400);
		expect(await responseBody(response)).toEqual({ ok: false, code: 'verification_failed' });
	});

	it('enforces the email rate limit after validation', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue(
				new Response(JSON.stringify({ success: true, hostname: 'www.mengche.dev', action: 'inquiry' }), {
					headers: { 'content-type': 'application/json' }
				})
			)
		);
		const env = createEnv({ emailAllowed: false });

		const response = await invoke(inquiryRequest(), env);
		expect(response.status).toBe(429);
		expect(await responseBody(response)).toEqual({ ok: false, code: 'rate_limited' });
		expect(env.INQUIRY_EMAIL.send).not.toHaveBeenCalled();
	});

	it('sends a validated inquiry to the fixed destination', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue(
				new Response(JSON.stringify({ success: true, hostname: 'www.mengche.dev', action: 'inquiry' }), {
					headers: { 'content-type': 'application/json' }
				})
			)
		);
		const env = createEnv();

		const response = await invoke(inquiryRequest(), env);

		expect(response.status).toBe(200);
		expect(await responseBody(response)).toEqual({ ok: true });
		expect(env.INQUIRY_EMAIL.send).toHaveBeenCalledOnce();
		expect(env.INQUIRY_EMAIL.send).toHaveBeenCalledWith(
			expect.objectContaining({
				from: 'contact@mengche.dev',
				to: 'contact@mengche.dev',
				replyTo: 'jay@example.com'
			})
		);
	});

	it('escapes user-provided HTML in email markup', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue(
				new Response(JSON.stringify({ success: true, hostname: 'www.mengche.dev', action: 'inquiry' }), {
					headers: { 'content-type': 'application/json' }
				})
			)
		);
		const env = createEnv();
		const response = await invoke(
			inquiryRequest({
				...validInquiry,
				name: '<img src=x onerror=alert(1)>',
				summary: '<script>alert(1)</script> project summary with enough detail.'
			}),
			env
		);

		expect(response.status).toBe(200);
		const message = vi.mocked(env.INQUIRY_EMAIL.send).mock.calls[0]?.[0];
		expect(message?.html).toContain('&lt;img src=x onerror=alert(1)&gt;');
		expect(message?.html).toContain('&lt;script&gt;alert(1)&lt;/script&gt;');
		expect(message?.html).not.toContain('<script>alert(1)</script>');
	});

	it('returns a stable delivery failure without exposing details', async () => {
		vi.stubGlobal(
			'fetch',
			vi.fn().mockResolvedValue(
				new Response(JSON.stringify({ success: true, hostname: 'www.mengche.dev', action: 'inquiry' }), {
					headers: { 'content-type': 'application/json' }
				})
			)
		);

		const response = await invoke(inquiryRequest(), createEnv({ emailFails: true }));
		expect(response.status).toBe(502);
		expect(await responseBody(response)).toEqual({ ok: false, code: 'delivery_failed' });
	});
});
