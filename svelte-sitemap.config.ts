import type { OptionsSvelteSitemap } from 'svelte-sitemap';

const config: OptionsSvelteSitemap = {
	domain: process.env['PUBLIC_SITE_URL'] ?? 'https://www.mengche.dev',
	resetTime: true
};

export default config;
