<script lang="ts">
	import { page } from '$app/state';
	import type { UrlLocale } from '@mengche/content';
	import { m } from '$lib/paraglide/messages.js';
	import { localizedPath } from '$lib/utils';

	const locale = $derived((page.params.locale ?? 'en') as UrlLocale);
	const isNotFound = $derived(page.status === 404);
	const title = $derived(isNotFound ? m.not_found_title() : m.error_title());
	const body = $derived(isNotFound ? m.not_found_body() : m.error_body());
</script>

<svelte:head>
	<title>{page.status}: {title}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<section class="shell section flow" style="--flow-space: var(--space-5)">
	<p class="eyebrow">{page.status}</p>
	<h1>{title}</h1>
	<p class="hero-summary">{body}</p>
	<a class="button" href={localizedPath(locale)}>{m.return_home()}</a>
</section>
