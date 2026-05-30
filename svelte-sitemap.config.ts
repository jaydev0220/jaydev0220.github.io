import type { OptionsSvelteSitemap } from 'svelte-sitemap';

const config: OptionsSvelteSitemap = {
	domain: process.env['SITE_URL'],
	resetTime: true
};

export default config;
