<script lang="ts">
  import ExternalLinkIcon from '@iconify-svelte/tabler/external-link';
  import BrandGithubIcon from '@iconify-svelte/tabler/brand-github';
  import { caseStudyComponents } from '@mengche/content';
  import { localeFromUrl, profile, text } from '@mengche/content';
  import Seo from '$lib/components/Seo.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import { localizedPath } from '$lib/utils';
  import type { PageProps } from './$types';

  type FeaturedSlug = keyof typeof caseStudyComponents.en;

  let { data }: PageProps = $props();
  const locale = $derived(data.locale);
  const contentLocale = $derived(localeFromUrl(locale));
  const projectImages = $derived(data.project.images.slice(0, 3));
  let ProjectContent = $derived(caseStudyComponents[contentLocale][data.project.slug as FeaturedSlug]);

  function actionLabel(label: 'repository' | 'live-project' | 'live-preview'): string {
    if (label === 'repository') return m.view_repository();
    return m.view_live_project();
  }

  function goBack(event: MouseEvent) {
    const navigationEntry = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined;
    const reachedByClientNavigation = navigationEntry ? navigationEntry.name !== window.location.href : false;
    const reachedByReferral = document.referrer.length > 0;

    if (history.length > 1 && (reachedByClientNavigation || reachedByReferral)) {
      event.preventDefault();
      history.back();
    }
  }
</script>

<Seo
  title={`${data.project.title} — ${text(profile.name, contentLocale)}`}
  description={text(data.project.summary, contentLocale)}
  {locale}
  path={`/projects/${data.project.slug}`}
  schema={{
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.project.title,
    description: text(data.project.summary, contentLocale),
    creator: { '@type': 'Person', name: text(profile.name, contentLocale) }
  }}
/>

<header class="shell project-header">
  <a class="text-link" href={localizedPath(locale, '/projects')} onclick={goBack}>← {m.back()}</a>
  <p class="eyebrow">{text(data.project.category, contentLocale)}</p>
  <h1>{data.project.title}</h1>
  <p class="hero-summary">{text(data.project.summary, contentLocale)}</p>
  <ul class="tech-list">
    {#each data.project.technologies as technology (technology)}
      <li>{technology}</li>
    {/each}
  </ul>
  <div class="cluster action-buttons">
    {#each data.project.actions as action (`${data.project.slug}-${action.label}`)}
      <a
        class="icon-button"
        href={action.url}
        target="_blank"
        rel="noreferrer"
        aria-label={actionLabel(action.label)}
        title={actionLabel(action.label)}
      >
        {#if action.label === 'repository'}
          <BrandGithubIcon aria-hidden="true" />
        {:else}
          <ExternalLinkIcon aria-hidden="true" />
        {/if}
      </a>
    {/each}
  </div>
</header>

{#if projectImages.length > 0}
  <div class="shell project-gallery">
    {#each projectImages as imageUrl, index (imageUrl)}
      <figure class="project-gallery-item">
        <img
          src={imageUrl}
          alt={`${data.project.title} screenshot ${index + 1}`}
          width="1280"
          height="720"
          loading={index === 0 ? 'eager' : 'lazy'}
          fetchpriority={index === 0 ? 'high' : 'auto'}
          decoding="async"
        />
      </figure>
    {/each}
  </div>
{/if}

<section class="section section-rule">
  <div class="shell">
    <article class="prose project-content">
      <ProjectContent />
    </article>
  </div>
</section>
