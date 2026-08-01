<script lang="ts">
	import { localeFromUrl, profile, text, type UrlLocale } from '@mengche/content';
	import { m } from '$lib/paraglide/messages.js';
	import { localizedPath } from '$lib/utils';
	import SocialLinks from './SocialLinks.svelte';

	let { locale }: { locale: UrlLocale } = $props();
	const contentLocale = $derived(localeFromUrl(locale));
</script>

<footer class="site-footer">
	<div class="shell footer-grid">
		<div class="flow" style="--flow-space: var(--space-2)">
			<a class="wordmark" href={localizedPath(locale)}>{text(profile.name, contentLocale)}</a>
			<p class="muted">
				© {new Date().getFullYear()}
				{text(profile.name, contentLocale)}. {m.footer_rights()}
			</p>
			<a class="text-link" href={localizedPath(locale, '/privacy')}>{m.privacy_page_title()}</a>
		</div>
		<SocialLinks />
	</div>
</footer>
