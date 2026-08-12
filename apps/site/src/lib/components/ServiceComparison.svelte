<script lang="ts">
  import { localeFromUrl, services, text, type UrlLocale } from '@mengche/content';
  import { m } from '$lib/paraglide/messages.js';
  import { formatTwd, formatUsd } from '$lib/utils';

  let { locale }: { locale: UrlLocale } = $props();
  let track!: HTMLDivElement;
  let activeIndex = $state(0);
  const contentLocale = $derived(localeFromUrl(locale));

  function handleScroll() {
    const cards = Array.from(track.querySelectorAll<HTMLElement>('.comparison-card'));
    activeIndex = cards.reduce(
      (closest, card, index) =>
        Math.abs(card.offsetLeft - track.offsetLeft - track.scrollLeft) <
        Math.abs(cards[closest].offsetLeft - track.offsetLeft - track.scrollLeft)
          ? index
          : closest,
      0
    );
  }

  function selectCard(index: number) {
    const card = track.querySelectorAll<HTMLElement>('.comparison-card')[index];
    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'
    });
    activeIndex = index;
  }
</script>

<section class="section section-rule">
  <div class="shell flow" style="--flow-space: var(--space-6)">
    <h2>{m.comparison()}</h2>
    <div class="comparison-track" bind:this={track} onscroll={handleScroll}>
      {#each services as service (service.id)}
        <article class="comparison-card flow" style="--flow-space: var(--space-4)">
          <h3>{text(service.title, contentLocale)}</h3>
          <dl class="comparison-facts">
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
            <div>
              <dt>{m.ideal_for()}</dt>
              <dd>{text(service.idealFor, contentLocale)}</dd>
            </div>
          </dl>
        </article>
      {/each}
    </div>
    <div class="comparison-pagination" aria-label={m.comparison()}>
      {#each services as service, index (service.id)}
        <button
          type="button"
          class:active={activeIndex === index}
          aria-label={text(service.title, contentLocale)}
          aria-current={activeIndex === index ? 'true' : undefined}
          onclick={() => selectCard(index)}
        ></button>
      {/each}
    </div>
  </div>
</section>
