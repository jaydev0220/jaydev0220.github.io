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
        '/en/projects/butter-personal-website',
        '/en/projects/nrg-commerce',
        '/en/projects/evosnake',
        '/en/about',
        '/en/contact',
        '/en/privacy',
        '/zh-tw',
        '/zh-tw/services',
        '/zh-tw/projects',
        '/zh-tw/projects/butter-personal-website',
        '/zh-tw/projects/nrg-commerce',
        '/zh-tw/projects/evosnake',
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
