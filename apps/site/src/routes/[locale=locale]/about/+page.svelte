<script lang="ts">
  import {
    commercialPages,
    buildAboutSchema,
    featuredProjects,
    localeFromUrl,
    pageSocialImage,
    profile,
    site,
    text
  } from '@mengche/content';
  import CommercialSections from '$lib/components/CommercialSections.svelte';
  import CredentialCard from '$lib/components/CredentialCard.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import { localizedPath } from '$lib/utils';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const locale = $derived(data.locale);
  const contentLocale = $derived(localeFromUrl(locale));
  const pageContent = $derived(commercialPages.about);
</script>

<Seo
  title={text(pageContent.title, contentLocale)}
  description={text(pageContent.description, contentLocale)}
  {locale}
  path="/about"
  image={pageSocialImage('about', contentLocale)}
  schema={buildAboutSchema(locale)}
/>

<header class="shell section flow" style="--flow-space: var(--space-5)">
  <p class="eyebrow">{m.about_page_intro()}</p>
  <h1>{text(pageContent.heading, contentLocale)}</h1>
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

<CommercialSections sections={pageContent.sections} locale={contentLocale} />

<section class="section section-rule">
  <div class="shell flow" style="--flow-space: var(--space-6)">
    <h2>{m.featured_projects()}</h2>
    <ul class="plain-list">
      {#each featuredProjects as project (project.slug)}
        <li>
          <a class="text-link" href={localizedPath(locale, `/projects/${project.slug}`)}>
            {project.title} — {text(project.summary, contentLocale)}
          </a>
        </li>
      {/each}
    </ul>
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
