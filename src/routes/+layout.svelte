<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<link rel="canonical" href="https://www.hsieh-dev.us.ci{page.url.pathname}" />
	<meta name="author" content="謝孟哲" />
	<meta name="og:type" content="website" />
	<meta name="og:url" content="https://www.hsieh-dev.us.ci{page.url.pathname}" />
	<meta name="og:locale" content="zh_TW" />
	<meta name="og:site_name" content="謝孟哲 - 全端工程師" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org/",
			"@type": "WebSite",
			"name": "謝孟哲 - 全端工程師",
			"url": "https://www.hsieh-dev.us.ci"
		}
	</script>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org/",
			"@type": "Person",
			"name": "謝孟哲",
			"url": "https://www.hsieh-dev.us.ci",
			"sameAs": [
				"https://www.facebook.com/jayxie9499/",
				"https://linkedin.com/in/mengche0220",
				"https://github.com/JayXie9499"
			],
			"jobTitle": "學生"
		}
	</script>
	<script type="application/ld+json">
		{
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"itemListElement": [
				{
					"@type": "ListItem",
					"position": 1,
					"name": "謝孟哲 - 全端工程師",
					"item": "https://www.hsieh-dev.us.ci"
				},
				{
					"@type": "ListItem",
					"position": 2,
					"name": "Daily Quote Generator",
					"item": "https://www.hsieh-dev.us.ci/daily-quote-generator"
				},
				{
					"@type": "ListItem",
					"position": 3,
					"name": "Password Strength Checker",
					"item": "https://www.hsieh-dev.us.ci/password-strength-checker"
				}
			]
		}
	</script>
</svelte:head>

{@render children()}
