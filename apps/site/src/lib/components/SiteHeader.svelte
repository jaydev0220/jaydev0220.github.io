<script lang="ts">
  import Menu2Icon from '$lib/icons/Menu2.svelte';
  import XIcon from '$lib/icons/X.svelte';
  import { page } from '$app/state';
  import { localeFromUrl, navigation, site, text, type UrlLocale } from '@mengche/content';
  import { m } from '$lib/paraglide/messages.js';
  import { localizedPath } from '$lib/utils';
  import LocaleSwitcher from './LocaleSwitcher.svelte';
  import ThemeToggle from './ThemeToggle.svelte';

  let { locale }: { locale: UrlLocale } = $props();
  let menuOpen = $state(false);
  let menuButton: HTMLButtonElement | undefined;
  const contentLocale = $derived(localeFromUrl(locale));

  function isCurrent(href: string): boolean {
    const target = localizedPath(locale, href);
    return href === '' ? page.url.pathname === target : page.url.pathname.startsWith(target);
  }

  function toggleMenu(event: MouseEvent) {
    menuButton = event.currentTarget as HTMLButtonElement;
    menuOpen = !menuOpen;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && menuOpen) {
      menuOpen = false;
      menuButton?.focus();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<a class="skip-link" href="#main-content">{m.skip_to_content()}</a>
<header class="site-header">
  <div class="shell header-inner">
    <a class="wordmark" href={localizedPath(locale)}>{site.brand}</a>
    <button
      class="icon-button menu-toggle"
      type="button"
      aria-controls="primary-navigation"
      aria-expanded={menuOpen}
      aria-label={menuOpen ? m.close_menu() : m.open_menu()}
      title={menuOpen ? m.close_menu() : m.open_menu()}
      onclick={toggleMenu}
    >
      {#if menuOpen}
        <XIcon aria-hidden="true" />
      {:else}
        <Menu2Icon aria-hidden="true" />
      {/if}
    </button>
    <nav
      id="primary-navigation"
      class:open={menuOpen}
      class="primary-nav"
      aria-label={m.primary_navigation()}
    >
      <div class="nav-links">
        {#each navigation as item (item.id)}
          <a
            href={localizedPath(locale, item.href)}
            aria-current={isCurrent(item.href) ? 'page' : undefined}
            onclick={() => (menuOpen = false)}
          >
            {text(item.label, contentLocale)}
          </a>
        {/each}
      </div>
      <div class="header-tools">
        <LocaleSwitcher {locale} />
        <ThemeToggle />
      </div>
    </nav>
  </div>
</header>
