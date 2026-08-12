import { describe, expect, it } from 'vitest';
import worker from './index.js';
import {
  CONTENT_SIGNAL,
  MARKDOWN_ROBOTS_POLICY,
  REFERRER_POLICY,
  X_FRAME_OPTIONS,
  acceptsMarkdown,
  markdownPathname
} from './negotiation.js';

function createEnv() {
  return {
    ASSETS: {
      async fetch(request) {
        const { pathname } = new URL(request.url);

        if (pathname === '/en/about.md') {
          return new Response('# About\n', {
            headers: { 'content-type': 'text/plain; charset=utf-8' }
          });
        }

        if (pathname === '/en/about') {
          return new Response('<main>About</main>', {
            headers: {
              'content-type': 'text/html',
              vary: 'Accept-Encoding'
            }
          });
        }

        if (pathname === '/app.js') {
          return new Response('console.log("ok")', {
            headers: { 'content-type': 'text/javascript' }
          });
        }

        return new Response('Not found', {
          status: 404,
          headers: { 'content-type': 'text/html' }
        });
      }
    }
  };
}

describe('site worker markdown negotiation', () => {
  it('serves the generated Markdown representation when explicitly accepted', async () => {
    const response = await worker.fetch(
      new Request('https://www.mengche.dev/en/about', {
        headers: { accept: 'text/html, text/markdown' }
      }),
      createEnv()
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
    expect(response.headers.get('content-signal')).toBe(CONTENT_SIGNAL);
    expect(response.headers.get('x-robots-tag')).toBe(MARKDOWN_ROBOTS_POLICY);
    expect(response.headers.get('x-frame-options')).toBe(X_FRAME_OPTIONS);
    expect(response.headers.get('referrer-policy')).toBe(REFERRER_POLICY);
    expect(response.headers.get('vary')).toBe('Accept');
    expect(await response.text()).toBe('# About\n');
  });

  it('keeps HTML as the default representation and merges Vary', async () => {
    const response = await worker.fetch(
      new Request('https://www.mengche.dev/en/about', {
        headers: { accept: 'text/html' }
      }),
      createEnv()
    );

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('text/html; charset=utf-8');
    expect(response.headers.get('content-signal')).toBe(CONTENT_SIGNAL);
    expect(response.headers.get('x-robots-tag')).toBeNull();
    expect(response.headers.get('x-frame-options')).toBe(X_FRAME_OPTIONS);
    expect(response.headers.get('referrer-policy')).toBe(REFERRER_POLICY);
    expect(response.headers.get('vary')).toBe('Accept-Encoding, Accept');
  });

  it('does not negotiate Markdown when its quality is zero', () => {
    const request = new Request('https://www.mengche.dev/en/about', {
      headers: { accept: 'text/markdown;q=0, text/html' }
    });

    expect(acceptsMarkdown(request)).toBe(false);
  });

  it('falls back to the original response when no Markdown page exists', async () => {
    const response = await worker.fetch(
      new Request('https://www.mengche.dev/missing', {
        headers: { accept: 'text/markdown' }
      }),
      createEnv()
    );

    expect(response.status).toBe(404);
    expect(response.headers.get('content-signal')).toBeNull();
  });

  it('applies the page policy to direct Markdown asset requests too', async () => {
    const response = await worker.fetch(new Request('https://www.mengche.dev/en/about.md'), createEnv());

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('text/markdown; charset=utf-8');
    expect(response.headers.get('content-signal')).toBe(CONTENT_SIGNAL);
    expect(response.headers.get('x-robots-tag')).toBe(MARKDOWN_ROBOTS_POLICY);
    expect(response.headers.get('vary')).toBe('Accept');
  });

  it('leaves non-HTML assets unchanged', async () => {
    const response = await worker.fetch(new Request('https://www.mengche.dev/app.js'), createEnv());

    expect(response.status).toBe(200);
    expect(response.headers.get('content-type')).toBe('text/javascript');
    expect(response.headers.get('content-signal')).toBeNull();
    expect(response.headers.get('vary')).toBeNull();
  });
});

describe('site worker helpers', () => {
  it('maps public HTML routes to generated Markdown assets', () => {
    expect(markdownPathname('/')).toBe('/index.md');
    expect(markdownPathname('/en')).toBe('/en.md');
    expect(markdownPathname('/en/about/')).toBe('/en/about.md');
    expect(markdownPathname('/en/about.html')).toBe('/en/about.md');
  });
});
