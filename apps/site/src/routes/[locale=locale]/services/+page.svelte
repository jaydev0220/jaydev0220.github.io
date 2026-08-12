<script lang="ts">
  import {
    commercialPages,
    localeFromUrl,
    pageSocialImage,
    profile,
    projectBySlug,
    projectSlugsForService,
    services,
    text
  } from '@mengche/content';
  import CommercialSections from '$lib/components/CommercialSections.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import { formatTwd, formatUsd, localizedPath } from '$lib/utils';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const locale = $derived(data.locale);
  const contentLocale = $derived(localeFromUrl(locale));
  const pageContent = $derived(commercialPages.services);
</script>

<Seo
  title={text(pageContent.title, contentLocale)}
  description={text(pageContent.description, contentLocale)}
  {locale}
  path="/services"
  image={pageSocialImage('services', contentLocale)}
  schema={{
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: m.services_page_title(),
    itemListElement: services.map((service, index) => ({
      '@type': 'Service',
      position: index + 1,
      name: text(service.title, contentLocale),
      description: text(service.summary, contentLocale),
      provider: { '@type': 'Person', name: text(profile.name, contentLocale) }
    }))
  }}
/>

<header class="shell section flow" style="--flow-space: var(--space-5)">
  <p class="eyebrow">{m.services_page_eyebrow()}</p>
  <h1>{text(pageContent.heading, contentLocale)}</h1>
  <p class="hero-summary">{m.services_page_intro()}</p>
</header>

{#each services as service, index (service.id)}
  <section class="section section-rule">
    <article class="shell service-card">
      <div class="service-card-heading">
        <span class="service-index">{String(index + 1).padStart(2, '0')}</span>
        <div class="flow" style="--flow-space: var(--space-4)">
          <h2>{text(service.title, contentLocale)}</h2>
          <p class="hero-summary">{text(service.summary, contentLocale)}</p>
        </div>
      </div>

      <dl class="service-meta">
        <div>
          <dt>{m.starting_from()}</dt>
          <dd class="price">{formatTwd(service.startingPriceTwd, contentLocale)}</dd>
          <dd class="muted">{m.approximate_usd({ amount: formatUsd(service.approximatePriceUsd) })}</dd>
        </div>
        <div>
          <dt>{m.estimated_timeline()}</dt>
          <dd>
            {service.deliveryRange.maximumWeeks
              ? m.weeks_range({
                  minimum: service.deliveryRange.minimumWeeks,
                  maximum: service.deliveryRange.maximumWeeks
                })
              : m.weeks_plus({ minimum: service.deliveryRange.minimumWeeks })}
          </dd>
        </div>
      </dl>

      <div class="service-detail-grid">
        <div class="service-detail flow" style="--flow-space: var(--space-3)">
          <h3>{m.ideal_for()}</h3>
          <p>{text(service.idealFor, contentLocale)}</p>
        </div>
        <div class="service-detail flow" style="--flow-space: var(--space-3)">
          <h3>{m.typical_deliverables()}</h3>
          <ul class="plain-list">
            {#each service.deliverables as deliverable (deliverable.en)}
              <li>{text(deliverable, contentLocale)}</li>
            {/each}
          </ul>
        </div>
        <div class="service-detail flow" style="--flow-space: var(--space-3)">
          <h3>{m.not_included()}</h3>
          <ul class="plain-list">
            {#each service.exclusions as exclusion (exclusion.en)}
              <li>{text(exclusion, contentLocale)}</li>
            {/each}
          </ul>
        </div>
      </div>

      <div class="service-detail flow" style="--flow-space: var(--space-3)">
        <h3>{m.related_project()}</h3>
        <ul class="plain-list">
          {#each projectSlugsForService(service.id) as slug (slug)}
            <li>
              <a class="text-link" href={localizedPath(locale, `/projects/${slug}`)}>
                {projectBySlug[slug].title}
              </a>
            </li>
          {/each}
        </ul>
      </div>
    </article>
  </section>
{/each}

<CommercialSections sections={pageContent.sections} locale={contentLocale} />

<section class="section section-rule">
  <div class="shell flow" style="--flow-space: var(--space-6)">
    <h2>{m.comparison()}</h2>
    <div class="comparison-wrap">
      <table class="comparison-table">
        <thead>
          <tr>
            <th scope="col">{m.form_service()}</th>
            <th scope="col">{m.starting_from()}</th>
            <th scope="col">{m.estimated_timeline()}</th>
            <th scope="col">{m.ideal_for()}</th>
          </tr>
        </thead>
        <tbody>
          {#each services as service (service.id)}
            <tr>
              <th scope="row">{text(service.title, contentLocale)}</th>
              <td>{formatTwd(service.startingPriceTwd, contentLocale)}</td>
              <td>
                {service.deliveryRange.maximumWeeks
                  ? m.weeks_range({
                      minimum: service.deliveryRange.minimumWeeks,
                      maximum: service.deliveryRange.maximumWeeks
                    })
                  : m.weeks_plus({ minimum: service.deliveryRange.minimumWeeks })}
              </td>
              <td>{text(service.idealFor, contentLocale)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>
  </div>
</section>

<section class="section section-rule">
  <div class="shell flow" style="--flow-space: var(--space-7)">
    <div class="flow" style="--flow-space: var(--space-3)">
      <p class="eyebrow">{m.commercial_terms()}</p>
      <h2>{m.engagement_boundaries()}</h2>
    </div>
    <dl class="terms-grid">
      <div class="term-card">
        <dt>{m.payment_heading()}</dt>
        <dd>{m.payment_terms()}</dd>
      </div>
      <div class="term-card">
        <dt>{m.revisions_heading()}</dt>
        <dd>{m.revision_terms()}</dd>
      </div>
      <div class="term-card">
        <dt>{m.scope_heading()}</dt>
        <dd>{m.scope_terms()}</dd>
      </div>
      <div class="term-card">
        <dt>{m.warranty_heading()}</dt>
        <dd>{m.warranty_terms()}</dd>
      </div>
    </dl>
  </div>
</section>

<section class="section section-rule">
  <div class="shell service-cta">
    <div class="flow" style="--flow-space: var(--space-3)">
      <p class="eyebrow">{m.next_step()}</p>
      <h2>{m.services_cta_heading()}</h2>
      <p class="secondary-text">{m.services_cta_body()}</p>
    </div>
    <a class="button" href={localizedPath(locale, '/contact')}>{m.contact_cta()}</a>
  </div>
</section>
