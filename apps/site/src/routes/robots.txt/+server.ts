import { site } from '@mengche/content';
import type { RequestHandler } from './$types';

export const prerender = true;

export const GET: RequestHandler = () =>
  new Response(`User-agent: *\nAllow: /\nSitemap: ${site.canonicalOrigin}/sitemap.xml\n`, {
    headers: { 'content-type': 'text/plain; charset=utf-8' }
  });
