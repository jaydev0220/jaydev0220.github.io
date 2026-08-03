import { acceptsMarkdown, isSuccessfulHtml, markdownPathname, pageResponse } from './negotiation.js';

export default {
  async fetch(request, env) {
    if ((request.method === 'GET' || request.method === 'HEAD') && acceptsMarkdown(request)) {
      const markdownUrl = new URL(request.url);
      markdownUrl.pathname = markdownPathname(markdownUrl.pathname);
      const markdownRequest = new Request(markdownUrl, request);
      const markdownResponse = await env.ASSETS.fetch(markdownRequest);

      if (markdownResponse.ok) {
        return pageResponse(markdownResponse, 'text/markdown; charset=utf-8');
      }
    }

    const response = await env.ASSETS.fetch(request);
    if (response.ok && new URL(request.url).pathname.endsWith('.md')) {
      return pageResponse(response, 'text/markdown; charset=utf-8');
    }
    if (!isSuccessfulHtml(response)) return response;

    return pageResponse(response, 'text/html; charset=utf-8');
  }
};
