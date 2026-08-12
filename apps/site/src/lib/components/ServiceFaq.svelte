<script lang="ts">
  import { text, type CommercialSection, type Locale } from '@mengche/content';
  import { m } from '$lib/paraglide/messages.js';

  let { sections, locale }: { sections: readonly CommercialSection[]; locale: Locale } = $props();
</script>

<section class="section section-rule" id="faq">
  <div class="shell faq-layout">
    <h2>{m.faq_heading()}</h2>
    <div class="faq-list">
      {#each sections as section (section.id)}
        <details class="faq-item" id={section.id}>
          <summary>{text(section.heading, locale)}</summary>
          <div class="flow prose faq-answer" style="--flow-space: var(--space-3)">
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
        </details>
      {/each}
    </div>
  </div>
</section>
