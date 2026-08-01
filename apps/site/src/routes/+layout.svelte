<script lang="ts">
	import { PUBLIC_CF_ANALYTICS_TOKEN } from '$env/static/public';
	import '../app.css';

	let { children } = $props();
</script>

<svelte:head>
	{#if PUBLIC_CF_ANALYTICS_TOKEN}
		<script
			defer
			src="https://static.cloudflareinsights.com/beacon.min.js"
			data-cf-beacon={JSON.stringify({ token: PUBLIC_CF_ANALYTICS_TOKEN })}
		></script>
	{/if}
</svelte:head>

{@render children()}
