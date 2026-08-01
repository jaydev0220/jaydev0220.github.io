<script lang="ts">
	import BrightnessAutoFilledIcon from '@iconify-svelte/tabler/brightness-auto-filled';
	import SunHighIcon from '@iconify-svelte/tabler/sun-high';
	import MoonIcon from '@iconify-svelte/tabler/moon';
	import { browser } from '$app/environment';
	import { m } from '$lib/paraglide/messages.js';

	type Theme = 'system' | 'light' | 'dark';

	const themes: readonly Theme[] = ['system', 'light', 'dark'];
	let theme = $state<Theme>(
		browser && themes.includes(localStorage.getItem('mengche-theme') as Theme)
			? (localStorage.getItem('mengche-theme') as Theme)
			: 'system'
	);
	const currentLabel = $derived(
		theme === 'system' ? m.theme_system() : theme === 'light' ? m.theme_light() : m.theme_dark()
	);

	function cycleTheme() {
		const nextTheme = themes[(themes.indexOf(theme) + 1) % themes.length];
		theme = nextTheme;
		document.documentElement.dataset.theme = nextTheme;
		localStorage.setItem('mengche-theme', nextTheme);
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
