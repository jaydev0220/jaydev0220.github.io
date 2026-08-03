<script lang="ts">
  import { featuredProjects, localeFromUrl, pageSocialImage, profile, text } from '@mengche/content';
  import ProjectList from '$lib/components/ProjectList.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const locale = $derived(data.locale);
  const contentLocale = $derived(localeFromUrl(locale));
</script>

<Seo
  title={`${m.projects_page_title()} — ${text(profile.name, contentLocale)}`}
  description={m.projects_page_intro()}
  {locale}
  path="/projects"
  image={pageSocialImage('projects', contentLocale)}
/>

<header class="shell section flow" style="--flow-space: var(--space-5)">
  <p class="eyebrow">{m.projects_page_eyebrow()}</p>
  <h1>{m.projects_page_title()}</h1>
  <p class="hero-summary">{m.projects_page_intro()}</p>
</header>

<section class="section section-rule">
  <div class="shell flow" style="--flow-space: var(--space-6)">
    <h2>{m.featured_projects()}</h2>
    <ProjectList projects={featuredProjects} {locale} />
  </div>
</section>
