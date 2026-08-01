<script lang="ts">
	import { profile, site } from '@mengche/content';
</script>

<svelte:head>
	<title>{profile.name.en} — Web development</title>
	<meta name="description" content={site.hero.summary.en} />
	<link rel="canonical" href={`${site.canonicalOrigin}/`} />
	<link rel="alternate" hreflang="en" href={`${site.canonicalOrigin}/en`} />
	<link rel="alternate" hreflang="zh-Hant-TW" href={`${site.canonicalOrigin}/zh-tw`} />
	<link rel="alternate" hreflang="x-default" href={`${site.canonicalOrigin}/`} />
	<meta property="og:title" content={`${profile.name.en} — Web development`} />
	<meta property="og:description" content={site.hero.summary.en} />
	<meta property="og:url" content={`${site.canonicalOrigin}/`} />
	<meta property="og:type" content="website" />
	<script>
		(() => {
			const saved = localStorage.getItem('mengche-locale');
			const locale =
				saved === 'en' || saved === 'zh-tw'
					? saved
					: navigator.languages.some((language) => language.toLowerCase().startsWith('zh'))
						? 'zh-tw'
						: navigator.languages.some((language) => language.toLowerCase().startsWith('en'))
							? 'en'
							: 'zh-tw';
			location.replace(`/${locale}`);
		})();
	</script>
</svelte:head>

<main class="shell section" id="main-content">
	<div class="flow" style="--flow-space: var(--space-6)">
		<p class="eyebrow">{profile.name.en}</p>
		<h1>Choose a language</h1>
		<p class="hero-summary">Choose a language for the site.</p>
		<div class="cluster">
			<a class="button" href="/zh-tw" data-sveltekit-reload>繁體中文</a>
			<a class="button secondary" href="/en" data-sveltekit-reload>English</a>
		</div>
	</div>
</main>
