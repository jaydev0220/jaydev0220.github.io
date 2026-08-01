import adapter from '@sveltejs/adapter-static';
import { mdsvex } from 'mdsvex';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	extensions: ['.svelte', '.md'],
	preprocess: [vitePreprocess(), mdsvex({ extensions: ['.md'] })],
	kit: {
		adapter: adapter({ pages: 'build', assets: 'build', fallback: '404.html', precompress: true }),
		paths: { relative: false },
		prerender: {
			entries: [
				'/',
				'/en',
				'/en/services',
				'/en/projects',
				'/en/projects/ping-board',
				'/en/projects/commnode',
				'/en/projects/suisui-personal-website',
				'/en/about',
				'/en/contact',
				'/en/privacy',
				'/zh-tw',
				'/zh-tw/services',
				'/zh-tw/projects',
				'/zh-tw/projects/ping-board',
				'/zh-tw/projects/commnode',
				'/zh-tw/projects/suisui-personal-website',
				'/zh-tw/about',
				'/zh-tw/contact',
				'/zh-tw/privacy',
				'/robots.txt',
				'/sitemap.xml'
			]
		}
	}
};

export default config;
