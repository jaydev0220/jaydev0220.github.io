<script lang="ts">
	import { resume } from '$lib/data';
	import Navigation from '$lib/components/Navigation.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import AboutSection from '$lib/components/AboutSection.svelte';
	import CertificatesSection from '$lib/components/CertificatesSection.svelte';
	import SkillsSection from '$lib/components/SkillsSection.svelte';
	import PortfolioSection from '$lib/components/PortfolioSection.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<svelte:head>
	<title>{resume.name} - {resume.title}</title>
	<meta name="description" content={resume.about.join('')} />
	<meta name="og:title" content="謝孟哲 - 全端工程師" />
	<meta name="og:description" content={resume.about.join('')} />
	<link rel="alternate" hreflang="zh" href="https://www.hsieh-dev.us.ci" />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<Navigation />
	<Hero />
	<AboutSection />
	<CertificatesSection />
	<SkillsSection />
	<PortfolioSection />
	<Footer />
</div>
