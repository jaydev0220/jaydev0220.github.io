<script lang="ts">
  import {
    featuredProjects,
    commercialPages,
    buildHomeSchema,
    localeFromUrl,
    pageSocialImage,
    services,
    site,
    text
  } from '@mengche/content';
  import ProjectList from '$lib/components/ProjectList.svelte';
  import CommercialSections from '$lib/components/CommercialSections.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import { formatTwd, formatUsd, localizedPath } from '$lib/utils';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const locale = $derived(data.locale);
  const contentLocale = $derived(localeFromUrl(locale));
  const description = $derived(text(site.hero.summary, contentLocale));
  const pageContent = $derived(commercialPages.home);
  const audienceSection = $derived(pageContent.sections.filter((section) => section.id === 'audience'));
  const fitSection = $derived(pageContent.sections.filter((section) => section.id === 'fit'));
  const startingSection = $derived(pageContent.sections.filter((section) => section.id === 'starting'));
  const schema = $derived(buildHomeSchema(locale));
</script>

<Seo
  title={text(pageContent.title, contentLocale)}
  description={text(pageContent.description, contentLocale)}
  {locale}
  image={pageSocialImage('home', contentLocale)}
  {schema}
/>

<section class="shell hero">
  <div class="availability">{text(site.availability.label, contentLocale)}</div>
  <div class="flow" style="--flow-space: var(--space-5)">
    <p class="eyebrow">{text(site.hero.eyebrow, contentLocale)}</p>
    <h1>{text(pageContent.heading, contentLocale)}</h1>
    <p class="hero-summary">{description}</p>
    <p class="secondary-text">{text(site.hero.title, contentLocale)}</p>
  </div>
  <div class="cluster">
    <a class="button" href={localizedPath(locale, '/contact')}>{m.contact_cta()}</a>
    <a class="button secondary" href={localizedPath(locale, '/projects')}>{m.view_projects()}</a>
  </div>
</section>

<CommercialSections sections={audienceSection} locale={contentLocale} />

<section class="section section-rule">
  <div class="shell flow" style="--flow-space: var(--space-7)">
    <div class="split">
      <div class="flow">
        <p class="eyebrow">{m.selected_work()}</p>
        <h2>{m.technical_credibility()}</h2>
      </div>
      <div class="fact-grid">
        <dl class="fact">
          <dt>{m.proof_architecture_label()}</dt>
          <dd>{m.proof_architecture_value()}</dd>
        </dl>
        <dl class="fact">
          <dt>{m.proof_quality_label()}</dt>
          <dd>{m.proof_quality_value()}</dd>
        </dl>
        <dl class="fact">
          <dt>{m.proof_delivery_label()}</dt>
          <dd>{m.proof_delivery_value()}</dd>
        </dl>
      </div>
    </div>
    <ProjectList projects={featuredProjects} {locale} />
  </div>
</section>

<section class="section section-rule">
  <div class="shell flow" style="--flow-space: var(--space-7)">
    <div class="service-intro">
      <div class="flow">
        <p class="eyebrow">{m.services_heading()}</p>
        <h2>{m.services_intro()}</h2>
      </div>
      <a class="button secondary" href={localizedPath(locale, '/services')}>{m.view_services()}</a>
    </div>
    <div class="editorial-list">
      {#each services as service, index (service.id)}
        <article class="editorial-row">
          <span class="service-index">{String(index + 1).padStart(2, '0')}</span>
          <div class="flow" style="--flow-space: var(--space-3)">
            <h3>{text(service.title, contentLocale)}</h3>
            <p class="secondary-text">{text(service.summary, contentLocale)}</p>
          </div>
          <div class="flow" style="--flow-space: var(--space-2)">
            <p class="price">{m.starting_from()} {formatTwd(service.startingPriceTwd, contentLocale)}</p>
            <p class="muted">{m.approximate_usd({ amount: formatUsd(service.approximatePriceUsd) })}</p>
            <p class="muted">
              {m.estimated_timeline()}:
              {service.deliveryRange.maximumWeeks
                ? m.weeks_range({
                    minimum: service.deliveryRange.minimumWeeks,
                    maximum: service.deliveryRange.maximumWeeks
                  })
                : m.weeks_plus({ minimum: service.deliveryRange.minimumWeeks })}
            </p>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>

<CommercialSections sections={fitSection} locale={contentLocale} />

<section class="section section-rule">
  <div class="shell flow" style="--flow-space: var(--space-7)">
    <h2>{m.process_heading()}</h2>
    <div class="process-grid">
      {#each site.process as step, index (step.id)}
        <article class="process-step flow" style="--flow-space: var(--space-3)">
          <h3>{text(step.title, contentLocale)}</h3>
          <p class="secondary-text">{text(step.summary, contentLocale)}</p>
        </article>
        {#if index < site.process.length - 1}
          <span class="process-arrow" aria-hidden="true"></span>
        {/if}
      {/each}
    </div>
  </div>
</section>

<CommercialSections sections={startingSection} locale={contentLocale} />

<section class="section section-rule">
  <div class="shell split">
    <div class="flow">
      <p class="eyebrow">{m.about_page_title()}</p>
      <h2>{m.about_preview_heading()}</h2>
    </div>
    <div class="flow">
      <p class="hero-summary">{m.about_preview_body()}</p>
      <a class="button secondary" href={localizedPath(locale, '/about')}>{m.about_page_title()}</a>
    </div>
  </div>
</section>

<section class="section section-rule">
  <div class="shell split">
    <div class="flow">
      <p class="eyebrow">{m.contact_cta()}</p>
      <h2>{m.contact_section_heading()}</h2>
    </div>
    <div class="flow">
      <p class="hero-summary">{m.contact_section_body()}</p>
      <a class="button" href={localizedPath(locale, '/contact')}>{m.contact_cta()}</a>
    </div>
  </div>
</section>
