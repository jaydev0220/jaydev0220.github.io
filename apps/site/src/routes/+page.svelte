<script lang="ts">
  import { buildWebsiteSchema, profile, rootSocialImage, site } from '@mengche/content';

  const image = rootSocialImage();
  const structuredData = JSON.stringify(buildWebsiteSchema()).replaceAll('<', '\\u003c');
</script>

<svelte:head>
  <title>{profile.name.en} — Web development</title>
  <meta name="description" content={site.hero.summary.en} />
  <meta name="robots" content="max-image-preview:large" />
  <link rel="canonical" href={`${site.canonicalOrigin}/`} />
  <link rel="alternate" hreflang="en" href={`${site.canonicalOrigin}/en`} />
  <link rel="alternate" hreflang="zh-Hant-TW" href={`${site.canonicalOrigin}/zh-tw`} />
  <link rel="alternate" hreflang="x-default" href={`${site.canonicalOrigin}/`} />
  <meta property="og:title" content={`${profile.name.en} — Web development`} />
  <meta property="og:description" content={site.hero.summary.en} />
  <meta property="og:url" content={`${site.canonicalOrigin}/`} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={site.brand} />
  <meta name="twitter:title" content={`${profile.name.en} — Web development`} />
  <meta name="twitter:description" content={site.hero.summary.en} />
  {#if image}
    <meta property="og:image" content={image.url} />
    <meta property="og:image:secure_url" content={image.url} />
    <meta property="og:image:type" content={image.mimeType} />
    <meta property="og:image:width" content={String(image.width)} />
    <meta property="og:image:height" content={String(image.height)} />
    <meta property="og:image:alt" content={image.alt.en} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={image.url} />
    <meta name="twitter:image:alt" content={image.alt.en} />
  {:else}
    <meta name="twitter:card" content="summary" />
  {/if}
  <svelte:element this={"script"} type="application/ld+json">{structuredData}</svelte:element>
  <script>
    (() => {
      const saved = localStorage.getItem('locale');
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
