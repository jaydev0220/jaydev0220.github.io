<script lang="ts">
  import { onMount } from 'svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import type { LayoutProps } from './$types';

  let { data, children }: LayoutProps = $props();

  onMount(() => {
    localStorage.setItem('locale', data.locale);
  });
</script>

<SiteHeader locale={data.locale} />
<main id="main-content">
  {@render children()}
</main>
<SiteFooter locale={data.locale} />
