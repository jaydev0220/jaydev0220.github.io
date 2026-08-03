<script lang="ts">
  import { localeFromUrl, pageSocialImage, profile, text } from '@mengche/content';
  import Seo from '$lib/components/Seo.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const locale = $derived(data.locale);
  const contentLocale = $derived(localeFromUrl(locale));
</script>

<Seo
  title={`${m.privacy_page_title()} — ${text(profile.name, contentLocale)}`}
  description={m.privacy_intro()}
  {locale}
  path="/privacy"
  image={pageSocialImage('privacy', contentLocale)}
/>

<header class="shell section flow" style="--flow-space: var(--space-5)">
  <p class="eyebrow">{text(profile.name, contentLocale)}</p>
  <h1>{m.privacy_page_title()}</h1>
  <p class="hero-summary">{m.privacy_intro()}</p>
</header>

<section class="section section-rule">
  <article class="shell prose">
    <h2>{m.privacy_form_heading()}</h2>
    <p>{m.privacy_form_body()}</p>

    <h2>{m.privacy_processors_heading()}</h2>
    <p>{m.privacy_processors_body()}</p>

    <h2>{m.privacy_retention_heading()}</h2>
    <p>{m.privacy_retention_body()}</p>

    <h2>{m.privacy_rights_heading()}</h2>
    <p>{m.privacy_rights_body()}</p>
  </article>
</section>
