import { commercialPages, featuredProjects, pageDates, preferredContentDate, site } from '@mengche/content';
import type { RequestHandler } from './$types';

export const prerender = true;

const staticPages = [
  { path: '', date: preferredContentDate(commercialPages.home) },
  { path: '/services', date: preferredContentDate(commercialPages.services) },
  { path: '/projects', date: preferredContentDate(commercialPages.projects) },
  { path: '/about', date: preferredContentDate(commercialPages.about) },
  { path: '/contact', date: pageDates.contact.publishedAt },
  { path: '/privacy', date: pageDates.privacy.publishedAt }
];
const pages = [
  ...staticPages,
  ...featuredProjects.map((project) => ({
    path: `/projects/${project.slug}`,
    date: preferredContentDate(project)
  }))
];

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: RequestHandler = () => {
  const root = `${site.canonicalOrigin}/`;
  const homeDate = preferredContentDate(commercialPages.home);
  const rootUrl = `<url><loc>${escapeXml(root)}</loc><lastmod>${homeDate}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${escapeXml(`${site.canonicalOrigin}/en`)}"/><xhtml:link rel="alternate" hreflang="zh-Hant-TW" href="${escapeXml(`${site.canonicalOrigin}/zh-tw`)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(root)}"/></url>`;
  const localizedUrls = pages
    .map(({ path, date }) => {
      const en = `${site.canonicalOrigin}/en${path}`;
      const zh = `${site.canonicalOrigin}/zh-tw${path}`;
      return `<url><loc>${escapeXml(en)}</loc><lastmod>${date}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/><xhtml:link rel="alternate" hreflang="zh-Hant-TW" href="${escapeXml(zh)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(site.canonicalOrigin)}/"/></url><url><loc>${escapeXml(zh)}</loc><lastmod>${date}</lastmod><xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/><xhtml:link rel="alternate" hreflang="zh-Hant-TW" href="${escapeXml(zh)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(site.canonicalOrigin)}/"/></url>`;
    })
    .join('');

  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${rootUrl}${localizedUrls}</urlset>`,
    {
      headers: {
        'content-type': 'application/xml; charset=utf-8',
        'cache-control': 'public, max-age=3600'
      }
    }
  );
};
