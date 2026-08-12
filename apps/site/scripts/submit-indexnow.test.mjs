import { describe, expect, it, vi } from 'vitest';
import {
  INDEXNOW_ENDPOINT,
  INDEXNOW_KEY,
  INDEXNOW_KEY_LOCATION,
  mergeSitemapLocations,
  parseSitemapLocations,
  submitIndexNow
} from './submit-indexnow.mjs';

const oldSitemap = `<?xml version="1.0"?><urlset xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url><loc>https://www.mengche.dev/en/removed</loc><xhtml:link href="https://www.mengche.dev/zh-tw/removed" /></url>
  <url><loc>https://elsewhere.example/page</loc></url>
</urlset>`;
const newSitemap = `<?xml version="1.0"?><urlset>
  <url><loc>https://www.mengche.dev/en/current?a=1&amp;b=2</loc></url>
  <url><loc>https://www.mengche.dev/en/removed</loc></url>
</urlset>`;

describe('IndexNow sitemap submission', () => {
  it('parses canonical loc elements only and restricts them to the configured host', () => {
    expect(parseSitemapLocations(oldSitemap)).toEqual(['https://www.mengche.dev/en/removed']);
  });

  it('deduplicates the old and new sitemap union to include removed URLs', () => {
    expect(mergeSitemapLocations(oldSitemap, newSitemap)).toEqual([
      'https://www.mengche.dev/en/removed',
      'https://www.mengche.dev/en/current?a=1&b=2'
    ]);
  });

  it.each([200, 202])('accepts HTTP %s and posts one protocol batch', async (status) => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('', { status }));
    await expect(submitIndexNow(['https://www.mengche.dev/en'], { fetchImpl })).resolves.toEqual({
      status,
      count: 1
    });
    expect(fetchImpl).toHaveBeenCalledOnce();
    expect(fetchImpl).toHaveBeenCalledWith(
      INDEXNOW_ENDPOINT,
      expect.objectContaining({
        method: 'POST',
        body: JSON.stringify({
          host: 'www.mengche.dev',
          key: INDEXNOW_KEY,
          keyLocation: INDEXNOW_KEY_LOCATION,
          urlList: ['https://www.mengche.dev/en']
        })
      })
    );
  });

  it.each([403, 422, 429, 500])('retries HTTP %s twice with bounded backoff', async (status) => {
    const fetchImpl = vi
      .fn()
      .mockResolvedValueOnce(new Response('', { status }))
      .mockResolvedValueOnce(new Response('', { status }))
      .mockResolvedValueOnce(new Response('', { status: 202 }));
    const sleep = vi.fn().mockResolvedValue(undefined);

    await expect(submitIndexNow(['https://www.mengche.dev/en'], { fetchImpl, sleep })).resolves.toEqual({
      status: 202,
      count: 1
    });
    expect(sleep.mock.calls).toEqual([[1000], [2000]]);
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it('reports a terminal failure after the third retryable response', async () => {
    const fetchImpl = vi.fn().mockResolvedValue(new Response('', { status: 503 }));
    const sleep = vi.fn().mockResolvedValue(undefined);

    await expect(submitIndexNow(['https://www.mengche.dev/en'], { fetchImpl, sleep })).rejects.toThrow(
      'HTTP 503'
    );
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });
});
