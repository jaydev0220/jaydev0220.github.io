<script lang="ts">
	import { page } from '$app/state';
	import type { UrlLocale } from '@mengche/content';
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { switchLocalePath } from '$lib/utils';

	const scrollKeyPrefix = 'mengche-locale-scroll:';

	let { locale }: { locale: UrlLocale } = $props();

	onMount(() => {
		const scrollKey = `${scrollKeyPrefix}${page.url.pathname}${page.url.search}`;
		const storedPosition = sessionStorage.getItem(scrollKey);
		if (!storedPosition) return;

		sessionStorage.removeItem(scrollKey);
		const position = JSON.parse(storedPosition) as { x: number; y: number };
		requestAnimationFrame(() => {
			requestAnimationFrame(() => window.scrollTo(position.x, position.y));
		});
	});

	function updateLocale(event: Event) {
		const nextLocale = (event.currentTarget as HTMLSelectElement).value as UrlLocale;
		if (nextLocale === locale) return;

		const targetPath = switchLocalePath(page.url.pathname, nextLocale);
		const targetUrl = `${targetPath}${page.url.search}${page.url.hash}`;
		const scrollKey = `${scrollKeyPrefix}${targetPath}${page.url.search}`;
		sessionStorage.setItem(scrollKey, JSON.stringify({ x: window.scrollX, y: window.scrollY }));
		localStorage.setItem('mengche-locale', nextLocale);
		window.location.assign(targetUrl);
	}
</script>

<label>
	<span class="visually-hidden">{m.language_switcher()}</span>
	<select
		class="compact-control locale-switcher"
		value={locale}
		onchange={updateLocale}
		aria-label={m.language_switcher()}
	>
		<option value="en">EN</option>
		<option value="zh-tw">繁中</option>
	</select>
</label>
