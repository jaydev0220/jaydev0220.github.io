<script lang="ts">
	import './layout.css';
	import { PUBLIC_CDN_URL } from '$env/static/public';

	let { children } = $props();
</script>

<svelte:head>
	<meta name="theme-color" content="#0a0a0f" />
	<link rel="preconnect" href={PUBLIC_CDN_URL} crossorigin="anonymous" />
	<link rel="icon" href="{PUBLIC_CDN_URL}/icons/favicon.svg" type="image/svg+xml" />
	<link rel="icon" href="{PUBLIC_CDN_URL}/icons/favicon.ico" type="image/x-icon" sizes="any" />
</svelte:head>

{@render children()}
