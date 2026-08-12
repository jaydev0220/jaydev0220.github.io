<script lang="ts">
  import { text, type CommercialSection, type Locale } from '@mengche/content';

  let {
    sections,
    locale
  }: { sections: readonly CommercialSection[]; locale: Locale } = $props();
</script>

{#each sections as section (section.id)}
  <section class="section section-rule" id={section.id}>
    <div class="shell split">
      <h2>{text(section.heading, locale)}</h2>
      <div class="flow prose" style="--flow-space: var(--space-4)">
        {#each section.paragraphs as paragraph (paragraph.en)}
          <p>{text(paragraph, locale)}</p>
        {/each}
        {#if section.bullets}
          <ul>
            {#each section.bullets as bullet (bullet.en)}
              <li>{text(bullet, locale)}</li>
            {/each}
          </ul>
        {/if}
      </div>
    </div>
  </section>
{/each}
