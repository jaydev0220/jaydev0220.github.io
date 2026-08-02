<script lang="ts">
  import { localeFromUrl, profile, site, socialLinks, text } from '@mengche/content';
  import CredentialCard from '$lib/components/CredentialCard.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const locale = $derived(data.locale);
  const contentLocale = $derived(localeFromUrl(locale));
</script>

<Seo
  title={`${m.about_page_title()} — ${text(profile.name, contentLocale)}`}
  description={text(profile.biography, contentLocale)}
  {locale}
  path="/about"
  schema={{
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: text(profile.name, contentLocale),
    jobTitle: text(profile.role, contentLocale),
    email: `mailto:${site.email}`,
    address: { '@type': 'PostalAddress', addressCountry: 'TW' },
    sameAs: socialLinks.map((social) => social.url)
  }}
/>

<header class="shell section flow" style="--flow-space: var(--space-5)">
  <p class="eyebrow">{m.about_page_intro()}</p>
  <h1>{m.about_page_title()}</h1>
  <p class="hero-summary">{text(profile.biography, contentLocale)}</p>
</header>

<section class="section section-rule">
  <div class="shell split capabilities-layout">
    <div class="flow">
      <p class="eyebrow">{m.capabilities()}</p>
      <h2>{text(profile.role, contentLocale)}</h2>
    </div>
    <div class="editorial-list capability-list">
      {#each profile.capabilities as capability, index (capability.en)}
        <div class="editorial-row capability-row">
          <span class="service-index">{String(index + 1).padStart(2, '0')}</span>
          <h3>{text(capability, contentLocale)}</h3>
        </div>
      {/each}
    </div>
  </div>
</section>

<section class="section section-rule">
  <div class="shell fact-grid about-facts">
    <dl class="fact">
      <dt>{m.education()}</dt>
      <dd>{text(profile.education.institution, contentLocale)} · {profile.education.period}</dd>
    </dl>
    <dl class="fact">
      <dt>{m.location()}</dt>
      <dd>{text(site.location, contentLocale)}</dd>
    </dl>
  </div>
</section>

<section class="section section-rule">
  <div class="shell flow" style="--flow-space: var(--space-7)">
    <div class="flow" style="--flow-space: var(--space-3)">
      <p class="eyebrow">{m.certificates()}</p>
      <h2>{m.certificates_heading()}</h2>
    </div>
    <div class="credential-list">
      {#each profile.qualifications as qualification (qualification.id)}
        <CredentialCard {qualification} />
      {/each}
    </div>
  </div>
</section>
