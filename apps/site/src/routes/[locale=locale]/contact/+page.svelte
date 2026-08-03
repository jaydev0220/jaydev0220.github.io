<script lang="ts">
  import { localeFromUrl, pageSocialImage, profile, site, text } from '@mengche/content';
  import ContactForm from '$lib/components/ContactForm.svelte';
  import Seo from '$lib/components/Seo.svelte';
  import SocialLinks from '$lib/components/SocialLinks.svelte';
  import { m } from '$lib/paraglide/messages.js';
  import type { PageProps } from './$types';

  let { data }: PageProps = $props();
  const locale = $derived(data.locale);
  const contentLocale = $derived(localeFromUrl(locale));
</script>

<Seo
  title={`${m.contact_page_title()} — ${text(profile.name, contentLocale)}`}
  description={m.contact_page_intro()}
  {locale}
  path="/contact"
  image={pageSocialImage('contact', contentLocale)}
/>

<header class="shell section flow" style="--flow-space: var(--space-5)">
  <p class="eyebrow">{text(site.availability.label, contentLocale)}</p>
  <h1>{m.contact_page_title()}</h1>
  <p class="hero-summary">{m.contact_page_intro()}</p>
</header>

<section class="section section-rule">
  <div class="shell contact-layout">
    <ContactForm {locale} />
    <aside class="flow" style="--flow-space: var(--space-6)">
      <div class="flow" style="--flow-space: var(--space-2)">
        <p class="eyebrow">{m.response_time()}</p>
        <p>
          {m.active_build_capacity({
            status: text(site.availability.label, contentLocale),
            count: site.availability.concurrentBuilds
          })}
        </p>
      </div>
      <a class="text-link" href={`mailto:${site.email}`}>{site.email}</a>
      <SocialLinks />
    </aside>
  </div>
</section>
