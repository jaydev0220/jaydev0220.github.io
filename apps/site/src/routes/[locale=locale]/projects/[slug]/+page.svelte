<script lang="ts">
  import ExternalLinkIcon from '$lib/icons/ExternalLink.svelte';
  import BrandGithubIcon from '$lib/icons/BrandGithub.svelte';
  import { caseStudyComponents } from '@mengche/content';
  import {
    localeFromUrl,
    profile,
    projectBySlug,
    projectSocialImage,
    relatedProjectSlugs,
    serviceById,
    serviceIdsForProject,
    site,
    text
  } from '@mengche/content';
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
  image={projectSocialImage(data.project.slug, contentLocale) ?? data.project.images[0]}
  schema={{
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: data.project.title,
    description: text(data.project.summary, contentLocale),
    url: `${site.canonicalOrigin}/${locale}/projects/${data.project.slug}`,
    inLanguage: contentLocale,
    image: data.project.images,
    creator: {
      '@type': 'Person',
      '@id': `${site.canonicalOrigin}/#person`,
      name: text(profile.name, contentLocale)
    }
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

<section class="section section-rule">
  <div class="shell split">
    <div class="flow">
      <h2>{m.services_page_title()}</h2>
      <ul class="plain-list">
        {#each serviceIdsForProject(data.project.slug) as serviceId (serviceId)}
          <li>
            <a class="text-link" href={localizedPath(locale, '/services')}>
              {text(serviceById[serviceId].title, contentLocale)}
            </a>
          </li>
        {/each}
      </ul>
    </div>
    <div class="flow">
      <h2>{m.related_project()}</h2>
      <ul class="plain-list">
        {#each relatedProjectSlugs(data.project.slug) as slug (slug)}
          <li>
            <a class="text-link" href={localizedPath(locale, `/projects/${slug}`)}>
              {projectBySlug[slug].title}
            </a>
          </li>
        {/each}
      </ul>
    </div>
  </div>
</section>

<section class="section section-rule">
  <div class="shell service-cta">
    <div class="flow">
      <p class="eyebrow">{m.next_step()}</p>
      <h2>{m.contact_section_heading()}</h2>
      <p>{m.contact_section_body()}</p>
    </div>
    <a class="button" href={localizedPath(locale, '/contact')}>{m.contact_cta()}</a>
  </div>
</section>
