<script lang="ts">
  import BrightnessAutoFilledIcon from '$lib/icons/BrightnessAutoFilled.svelte';
  import SunHighIcon from '$lib/icons/SunHigh.svelte';
  import MoonIcon from '$lib/icons/Moon.svelte';
  import { browser } from '$app/environment';
  import { m } from '$lib/paraglide/messages.js';

  type Theme = 'system' | 'light' | 'dark';

  const themes: readonly Theme[] = ['system', 'light', 'dark'];
  let theme = $state<Theme>(
    browser && themes.includes(localStorage.getItem('theme') as Theme)
      ? (localStorage.getItem('theme') as Theme)
      : 'system'
  );
  const currentLabel = $derived(
    theme === 'system' ? m.theme_system() : theme === 'light' ? m.theme_light() : m.theme_dark()
  );

  function cycleTheme() {
    const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
    theme = nextTheme;
    document.documentElement.dataset.theme = nextTheme;
    localStorage.setItem('theme', nextTheme);
  }
</script>

<button
  type="button"
  class="icon-button"
  onclick={cycleTheme}
  aria-label={`${m.theme_toggle()}: ${currentLabel}`}
  title={`${m.theme_toggle()}: ${currentLabel}`}
>
  {#if theme === 'system'}
    <BrightnessAutoFilledIcon aria-hidden="true" />
  {:else if theme === 'light'}
    <SunHighIcon aria-hidden="true" />
  {:else}
    <MoonIcon aria-hidden="true" />
  {/if}
</button>
