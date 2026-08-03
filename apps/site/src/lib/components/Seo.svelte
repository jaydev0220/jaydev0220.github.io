<script lang="ts">
  import { site, type UrlLocale } from '@mengche/content';
  import { localizedPath } from '$lib/utils';

  let {
    title,
    description,
    locale,
    path = '',
    schema,
    image
  }: {
    title: string;
    description: string;
    locale: UrlLocale;
    path?: string;
    schema?: Record<string, unknown>;
    image?: string;
  } = $props();

  const canonical = $derived(`${site.canonicalOrigin}${localizedPath(locale, path)}`);
  const siteName = site.brand;
  const english = $derived(`${site.canonicalOrigin}${localizedPath('en', path)}`);
  const traditionalChinese = $derived(`${site.canonicalOrigin}${localizedPath('zh-tw', path)}`);
  const alternateOpenGraphLocale = $derived(locale === 'zh-tw' ? 'en_US' : 'zh_TW');
  const structuredData = $derived(schema ? JSON.stringify(schema).replaceAll('<', '\\u003c') : '');
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
  <meta name="robots" content="max-image-preview:large" />
  <link rel="canonical" href={canonical} />
  <link rel="alternate" hreflang="en" href={english} />
  <link rel="alternate" hreflang="zh-Hant-TW" href={traditionalChinese} />
  <link rel="alternate" hreflang="x-default" href={`${site.canonicalOrigin}/`} />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content={siteName} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:url" content={canonical} />
  <meta property="og:locale" content={locale === 'zh-tw' ? 'zh_TW' : 'en_US'} />
  <meta property="og:locale:alternate" content={alternateOpenGraphLocale} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  {#if image}
    <meta property="og:image" content={image} />
    <meta property="og:image:alt" content={title} />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content={image} />
    <meta name="twitter:image:alt" content={title} />
  {:else}
    <meta name="twitter:card" content="summary" />
  {/if}
  {#if structuredData}
    <svelte:element this={"script"} type="application/ld+json">{structuredData}</svelte:element>
  {/if}
</svelte:head>
