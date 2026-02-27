<script lang="ts">
	import './layout.css';
	import '@fontsource/monaspace-neon/400.css';
	import '@fontsource/monaspace-neon/500.css';
	import '@fontsource/monaspace-neon/600.css';
	import '@fontsource/intel-one-mono/latin-400.css';
	import '@fontsource/intel-one-mono/latin-500.css';
	import '@fontsource/intel-one-mono/latin-600.css';
	import '@fontsource/space-grotesk/latin-400.css';
	import '@fontsource/space-grotesk/latin-500.css';
	import '@fontsource/space-grotesk/latin-700.css';
	import '@fontsource/syne/latin-400.css';
	import '@fontsource/syne/latin-500.css';
	import '@fontsource/syne/latin-700.css';
	import '@fontsource/lxgw-wenkai-tc/chinese-traditional-400.css';
	import '@fontsource/lxgw-wenkai-tc/chinese-traditional-700.css';
	import '@fontsource/noto-sans-tc/chinese-traditional-400.css';
	import '@fontsource/noto-sans-tc/chinese-traditional-500.css';
	import '@fontsource/noto-sans-tc/chinese-traditional-700.css';
	import { page } from '$app/state';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href="https://cdn.hsieh-dev.us.ci/icons/favicon.ico" />
	<link rel="canonical" href="https://www.hsieh-dev.us.ci{page.url.pathname}" />
	<meta name="author" content="謝孟哲" />
	<meta property="og:type" content="website" />
	<meta property="og:image" content="https://cdn.hsieh-dev.us.ci/icons/favicon.ico" />
	<meta property="og:image:type" content="image/x-icon" />
	<meta
		property="og:image:alt"
		content="A white rounded square icon featuring the black Chinese character '哲' in the center, with blue L-shaped corner borders at the top-left and bottom-right."
	/>
	<meta property="og:url" content="https://www.hsieh-dev.us.ci{page.url.pathname}" />
	<meta property="og:locale" content="zh_TW" />
	<meta property="og:locale_alternate" content="en_US" />
	<meta property="og:site_name" content="謝孟哲 - 全端工程師" />
	<script type="application/ld+json">
		{
			"@context": "https://schema.org/",
			"@type": "Person",
			"name": "謝孟哲",
			"url": "https://www.hsieh-dev.us.ci",
			"sameAs": [
				"https://www.facebook.com/jaydev0220/",
				"https://linkedin.com/in/mengche0220",
				"https://github.com/jaydev0220",
				"https://x.com/jay_dev0220"
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
					"name": "Icon Credits | 謝孟哲",
					"item": "https://www.hsieh-dev.us.ci/credits"
				},
				{
					"@type": "ListItem",
					"position": 3,
					"name": "Daily Quote Generator",
					"item": "https://www.hsieh-dev.us.ci/daily-quote-generator"
				},
				{
					"@type": "ListItem",
					"position": 4,
					"name": "Password Strength Checker",
					"item": "https://www.hsieh-dev.us.ci/password-strength-checker"
				},
				{
					"@type": "ListItem",
					"position": 5,
					"name": "Pomodoro Timer",
					"item": "https://www.hsieh-dev.us.ci/pomodoro-timer"
				},
				{
					"@type": "ListItem",
					"position": 6,
					"name": "CSS 3D",
					"item": "https://www.hsieh-dev.us.ci/css-3d"
				}
			]
		}
	</script>
</svelte:head>

{@render children()}
