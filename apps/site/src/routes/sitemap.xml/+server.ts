import { featuredProjects, site } from '@mengche/content';
import type { RequestHandler } from './$types';

export const prerender = true;

const staticPaths = ['', '/services', '/projects', '/about', '/contact', '/privacy'];
const paths = [...staticPaths, ...featuredProjects.map((project) => `/projects/${project.slug}`)];

const escapeXml = (value: string) => value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: RequestHandler = () => {
	const urls = paths
		.map((path) => {
			const en = `${site.canonicalOrigin}/en${path}`;
			const zh = `${site.canonicalOrigin}/zh-tw${path}`;
			return `<url><loc>${escapeXml(en)}</loc><xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/><xhtml:link rel="alternate" hreflang="zh-Hant-TW" href="${escapeXml(zh)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(site.canonicalOrigin)}/"/></url><url><loc>${escapeXml(zh)}</loc><xhtml:link rel="alternate" hreflang="en" href="${escapeXml(en)}"/><xhtml:link rel="alternate" hreflang="zh-Hant-TW" href="${escapeXml(zh)}"/><xhtml:link rel="alternate" hreflang="x-default" href="${escapeXml(site.canonicalOrigin)}/"/></url>`;
		})
		.join('');

	return new Response(
		`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urls}</urlset>`,
		{ headers: { 'content-type': 'application/xml; charset=utf-8' } }
	);
};
