const CONTENT_SIGNAL = 'ai-train=no, search=yes, ai-input=yes';

function acceptsMarkdown(request) {
  const accept = request.headers.get('accept');
  if (!accept) return false;

  return accept.split(',').some((entry) => {
    const [mediaType, ...parameters] = entry.split(';').map((part) => part.trim().toLowerCase());
    if (mediaType !== 'text/markdown') return false;

    const quality = parameters.find((parameter) => parameter.startsWith('q='));
    if (!quality) return true;

    const value = Number.parseFloat(quality.slice(2));
    return Number.isFinite(value) && value > 0;
  });
}

function markdownPathname(pathname) {
  if (pathname === '/') return '/index.md';

  const normalized = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
  if (normalized.endsWith('.html')) return normalized.replace(/\.html$/i, '.md');
  return `${normalized}.md`;
}

function withVaryAccept(headers) {
  const vary = headers.get('vary');
  if (!vary) {
    headers.set('vary', 'Accept');
    return;
  }

  const values = vary.split(',').map((value) => value.trim().toLowerCase());
  if (!values.includes('accept')) headers.set('vary', `${vary}, Accept`);
}

function pageResponse(response, contentType) {
  const headers = new Headers(response.headers);
  headers.set('content-type', contentType);
  headers.set('content-signal', CONTENT_SIGNAL);
  withVaryAccept(headers);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers
  });
}

function isSuccessfulHtml(response) {
  return response.ok && response.headers.get('content-type')?.toLowerCase().includes('text/html');
}

export { CONTENT_SIGNAL, acceptsMarkdown, isSuccessfulHtml, markdownPathname, pageResponse };
