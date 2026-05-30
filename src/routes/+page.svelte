<script lang="ts">
	import { Head, SchemaOrg, type SeoConfig, type SchemaOrgProps } from 'svead';
	import { page } from '$app/state';
	import { resume, socialLinks } from '$lib/data';
	import Navigation from '$lib/components/Navigation.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import CertificatesSection from '$lib/components/CertificatesSection.svelte';
	import SkillsSection from '$lib/components/SkillsSection.svelte';
	import PortfolioSection from '$lib/components/PortfolioSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { PUBLIC_CDN_URL } from '$env/static/public';

	const title = '謝孟哲 - 全端工程師';
	const description = resume.about.join('');
	const url = page.url.toString();
	const language = 'zh-tw';
	const seoConfig: SeoConfig = {
		title,
		description,
		url,
		author_name: '謝孟哲',
		language,
		open_graph_image: `${PUBLIC_CDN_URL}/photos/avatar.webp`,
		open_graph_image_alt: "Meng Che Hsieh's avatar"
	};
	const personSchema: SchemaOrgProps['schema'] = {
		'@type': 'Person',
		name: '謝孟哲',
		alternateName: ['Meng Che Hsieh', 'Hsieh Meng Che', 'Jay'],
		url: page.url.toString(),
		sameAs: socialLinks.map(({ url }) => url),
		jobTitle: ['全端工程師', 'Fullstack Developer'],
		email: 'contact@mengche.dev',
		gender: 'male'
	};
	const websiteSchema: SchemaOrgProps['schema'] = {
		'@type': 'WebSite',
		name: title,
		description,
		url,
		publisher: personSchema,
		inLanguage: language
	};
</script>

<Head seo_config={seoConfig} />
<SchemaOrg schema={personSchema} />
<SchemaOrg schema={websiteSchema} />

<div class="flex min-h-screen flex-col">
	<Navigation />
	<main id="main-content" class="flex flex-col">
		<Hero />
		<AboutSection />
		<CertificatesSection />
		<SkillsSection />
		<PortfolioSection />
	</main>
	<Footer />
</div>
