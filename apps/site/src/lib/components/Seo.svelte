<script lang="ts">
  import { localeFromUrl, profile, site, text, type UrlLocale } from '@mengche/content';
  import { localizedPath } from '$lib/utils';

  let {
    title,
    description,
    locale,
    path = '',
    schema
  }: {
    title: string;
    description: string;
    locale: UrlLocale;
    path?: string;
    schema?: Record<string, unknown>;
  } = $props();

  const canonical = $derived(`${site.canonicalOrigin}${localizedPath(locale, path)}`);
  const siteName = $derived(text(profile.name, localeFromUrl(locale)));
  const english = $derived(`${site.canonicalOrigin}${localizedPath('en', path)}`);
  const traditionalChinese = $derived(`${site.canonicalOrigin}${localizedPath('zh-tw', path)}`);
  const structuredData = $derived(schema ? JSON.stringify(schema).replaceAll('<', '\\u003c') : '');
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="description" content={description} />
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
  <meta name="twitter:card" content="summary" />
  {#if structuredData}
    <svelte:element this={"script"} type="application/ld+json">{structuredData}</svelte:element>
  {/if}
</svelte:head>
