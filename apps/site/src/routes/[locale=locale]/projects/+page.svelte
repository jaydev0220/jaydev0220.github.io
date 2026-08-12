<script lang="ts">
  import {
    buildProjectsSchema,
    commercialPages,
    featuredProjects,
    localeFromUrl,
    pageSocialImage,
    text
  } from '@mengche/content';
  import CommercialSections from '$lib/components/CommercialSections.svelte';
  import ProjectList from '$lib/components/ProjectList.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const locale = $derived(data.locale);
  const contentLocale = $derived(localeFromUrl(locale));
  const pageContent = $derived(commercialPages.projects);
</script>

<Seo
  title={text(pageContent.title, contentLocale)}
  description={text(pageContent.description, contentLocale)}
  {locale}
  path="/projects"
  image={pageSocialImage('projects', contentLocale)}
  schema={buildProjectsSchema(locale)}
/>

<header class="shell section flow" style="--flow-space: var(--space-5)">
  <p class="eyebrow">{m.projects_page_eyebrow()}</p>
  <h1>{text(pageContent.heading, contentLocale)}</h1>
  <p class="hero-summary">{m.projects_page_intro()}</p>
</header>

<section class="section section-rule">
  <div class="shell flow" style="--flow-space: var(--space-6)">
    <h2>{m.featured_projects()}</h2>
    <ProjectList projects={featuredProjects} {locale} />
  </div>
</section>

<CommercialSections sections={pageContent.sections} locale={contentLocale} />
