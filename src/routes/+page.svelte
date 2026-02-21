<script lang="ts">
	import {
		resume,
		socialLinks,
		education,
		skillCategories,
		projects,
		navLinks,
		typingStrings,
		projectFilters,
		certificates,
		type ProjectType,
		type Project
	} from '$lib/data';
	import { onMount } from 'svelte';

	// Skill SVGs
	import html5Svg from '$lib/assets/html5.svg';
	import cssSvg from '$lib/assets/css.svg';
	import javascriptSvg from '$lib/assets/javascript.svg';
	import typescriptSvg from '$lib/assets/typescript.svg';
	import svelteSvg from '$lib/assets/svelte.svg';
	import tailwindcssSvg from '$lib/assets/tailwindcss.svg';
	import flutterSvg from '$lib/assets/flutter.svg';
	import nodedotjsSvg from '$lib/assets/nodedotjs.svg';
	import pythonSvg from '$lib/assets/python.svg';
	import expressSvg from '$lib/assets/express.svg';
	import fastapiSvg from '$lib/assets/fastapi.svg';
	import restSvg from '$lib/assets/rest.svg';
	import graphqlSvg from '$lib/assets/graphql.svg';
	import postgresqlSvg from '$lib/assets/postgresql.svg';
	import redisSvg from '$lib/assets/redis.svg';
	import mongodbSvg from '$lib/assets/mongodb.svg';
	import sqliteSvg from '$lib/assets/sqlite.svg';
	import dockerSvg from '$lib/assets/docker.svg';
	import githubactionsSvg from '$lib/assets/githubactions.svg';
	import awsSvg from '$lib/assets/aws.svg';
	import googlecloudSvg from '$lib/assets/googlecloud.svg';
	import railwaySvg from '$lib/assets/railway.svg';
	import cloudflareSvg from '$lib/assets/cloudflare.svg';
	// Social SVGs
	import facebookSvg from '$lib/assets/facebook.svg';
	import discordSvg from '$lib/assets/discord.svg';
	import githubSvg from '$lib/assets/github.svg';
	import linkedinSvg from '$lib/assets/linkedin.svg';
	import xSvg from '$lib/assets/x.svg';
	import mailSvg from '$lib/assets/mail.svg';
	// Contact SVGs
	import locationSvg from '$lib/assets/location.svg';

	// Icon map
	const iconMap: Record<string, string> = {
		html5: html5Svg,
		css: cssSvg,
		javascript: javascriptSvg,
		typescript: typescriptSvg,
		svelte: svelteSvg,
		tailwindcss: tailwindcssSvg,
		flutter: flutterSvg,
		nodedotjs: nodedotjsSvg,
		python: pythonSvg,
		express: expressSvg,
		fastapi: fastapiSvg,
		rest: restSvg,
		graphql: graphqlSvg,
		postgresql: postgresqlSvg,
		redis: redisSvg,
		mongodb: mongodbSvg,
		sqlite: sqliteSvg,
		docker: dockerSvg,
		githubactions: githubactionsSvg,
		aws: awsSvg,
		googlecloud: googlecloudSvg,
		railway: railwaySvg,
		cloudflare: cloudflareSvg,
		facebook: facebookSvg,
		discord: discordSvg,
		github: githubSvg,
		linkedin: linkedinSvg,
		x: xSvg,
		mail: mailSvg,
		location: locationSvg
	};

	// Mobile menu state
	let mobileMenuOpen = $state(false);

	// Typing animation state
	let typedText = $state('');
	let currentStringIndex = $state(0);
	let currentCharIndex = $state(0);
	let isDeleting = $state(false);

	// Skills accordion state - track which categories are expanded
	let expandedCategories = $state<Set<string>>(new Set());

	// Portfolio filter state
	let activeFilter = $state<ProjectType>('all');
	let filteredProjects = $state<Project[]>(projects);

	// Close mobile menu
	function closeMobileMenu() {
		mobileMenuOpen = false;
	}

	// Toggle mobile menu
	function toggleMobileMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	// Handle navigation click
	function handleNavClick(e: MouseEvent, href: string) {
		e.preventDefault();
		const target = document.querySelector(href);
		if (target) {
			target.scrollIntoView({ behavior: 'smooth' });
			closeMobileMenu();
		}
	}

	// Typing animation effect
	onMount(() => {
		const typingSpeed = 100;
		const deletingSpeed = 50;
		const pauseBeforeDelete = 2000;
		const pauseBeforeType = 500;

		let timeout: ReturnType<typeof setTimeout>;

		function type() {
			const currentString = typingStrings[currentStringIndex];

			if (!isDeleting && currentCharIndex < currentString.length) {
				// Typing forward
				typedText = currentString.substring(0, currentCharIndex + 1);
				currentCharIndex++;
				timeout = setTimeout(type, typingSpeed);
			} else if (!isDeleting && currentCharIndex === currentString.length) {
				// Pause before deleting
				timeout = setTimeout(() => {
					isDeleting = true;
					type();
				}, pauseBeforeDelete);
			} else if (isDeleting && currentCharIndex > 0) {
				// Deleting
				typedText = currentString.substring(0, currentCharIndex - 1);
				currentCharIndex--;
				timeout = setTimeout(type, deletingSpeed);
			} else if (isDeleting && currentCharIndex === 0) {
				// Move to next string
				isDeleting = false;
				currentStringIndex = (currentStringIndex + 1) % typingStrings.length;
				timeout = setTimeout(type, pauseBeforeType);
			}
		}

		type();

		// Initialize accordion state based on viewport
		const isDesktop = window.matchMedia('(min-width: 768px)').matches;
		if (isDesktop) {
			expandedCategories = new Set(skillCategories.map((c) => c.category));
		}

		// Listen for resize to update default state
		const mediaQuery = window.matchMedia('(min-width: 768px)');
		const handleMediaChange = (e: MediaQueryListEvent) => {
			if (e.matches) {
				expandedCategories = new Set(skillCategories.map((c) => c.category));
			} else {
				expandedCategories = new Set();
			}
		};
		mediaQuery.addEventListener('change', handleMediaChange);

		return () => {
			clearTimeout(timeout);
			mediaQuery.removeEventListener('change', handleMediaChange);
		};
	});

	// Toggle skill category accordion
	function toggleCategory(category: string) {
		const next = new Set(expandedCategories);
		if (next.has(category)) {
			next.delete(category);
		} else {
			next.add(category);
		}
		expandedCategories = next;
	}

	// Filter projects
	function filterProjects(type: ProjectType) {
		activeFilter = type;

		if (type === 'all') {
			filteredProjects = projects;
		} else {
			filteredProjects = projects.filter((project) => project.type.includes(type));
		}
	}

	// Scroll to top
	function scrollToTop() {
		window.scrollTo({ top: 0, behavior: 'smooth' });
	}
</script>

<svelte:head>
	<title>{resume.name} - {resume.title}</title>
	<meta name="description" content={resume.about} />
</svelte:head>

<div class="flex min-h-screen flex-col">
	<!-- Navigation -->
	<nav
		class="sticky top-0 z-(--z-nav) border-b border-border bg-bg-primary/95 py-4 backdrop-blur-[10px]"
		data-testid="navigation"
	>
		<div class="mx-auto flex max-w-max-width items-center justify-between px-6">
			<button
				class="font-family-display text-2xl font-bold text-accent-primary transition-transform duration-(--transition-fast) hover:scale-105"
				onclick={scrollToTop}
				data-testid="logo"
			>
				{resume.name}
			</button>

			<!-- Desktop Navigation -->
			<div class="hidden gap-8 md:flex" data-testid="desktop-nav">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						onclick={(e) => handleNavClick(e, link.href)}
						class="relative font-medium text-text-secondary transition-colors duration-(--transition-fast) after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent-primary after:transition-[width] after:duration-(--transition-base) after:content-[''] hover:text-accent-primary hover:after:w-full"
						data-testid={`nav-link-${link.id}`}
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Mobile Hamburger -->
			<button
				class="z-[calc(var(--z-drawer)+10)] flex flex-col gap-1.25 p-2 md:hidden"
				onclick={toggleMobileMenu}
				aria-label="Toggle menu"
				data-testid="hamburger-button"
			>
				<span class="h-0.5 w-6.25 bg-text-primary transition-all duration-(--transition-base)"
				></span>
				<span class="h-0.5 w-6.25 bg-text-primary transition-all duration-(--transition-base)"
				></span>
				<span class="h-0.5 w-6.25 bg-text-primary transition-all duration-(--transition-base)"
				></span>
			</button>
		</div>
	</nav>

	<!-- Mobile Menu Drawer -->
	{#if mobileMenuOpen}
		<div
			class="fixed inset-0 z-(--z-overlay) animate-[fadeIn_var(--transition-base)] bg-black/70"
			onclick={closeMobileMenu}
			onkeydown={(e) => e.key === 'Escape' && closeMobileMenu()}
			role="button"
			tabindex="-1"
			aria-label="Close menu"
			data-testid="mobile-overlay"
		></div>
		<div
			class="fixed top-0 bottom-0 left-0 z-(--z-drawer) w-70 max-w-[80vw] animate-[slideInLeft_var(--transition-slow)] bg-bg-secondary p-8"
			data-testid="mobile-drawer"
		>
			<div class="mb-12 flex items-center justify-between">
				<span class="font-family-display text-2xl font-bold text-accent-primary">選單</span>
				<button
					class="p-2 text-[2rem] text-text-secondary transition-colors duration-(--transition-fast) hover:text-accent-primary"
					onclick={closeMobileMenu}
					aria-label="Close menu"
					data-testid="close-menu-button"
				>
					✕
				</button>
			</div>
			<nav class="flex flex-col gap-6">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						onclick={(e) => handleNavClick(e, link.href)}
						class="p-4 text-lg font-medium text-text-primary transition-all duration-(--transition-fast) hover:translate-x-2 hover:bg-bg-tertiary hover:text-accent-primary"
						data-testid={`mobile-nav-link-${link.id}`}
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>
	{/if}

	<!-- Hero Section -->
	<section
		class="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-bg-primary px-6 py-12 before:absolute before:top-[-50%] before:right-[-50%] before:h-full before:w-full before:animate-[pulse_8s_ease-in-out_infinite] before:bg-[radial-gradient(circle,rgba(79,70,229,0.05)_0%,transparent_70%)] before:content-['']"
		data-testid="hero-section"
	>
		<div class="z-1 w-full text-center">
			<div class="mb-8">
				<div class="flex min-h-20 items-center justify-center">
					<div
						class="flex items-center gap-4 font-(family-name:--font-family-mono) text-[clamp(1.25rem,4vw,1.75rem)] text-white"
					>
						<span class="min-h-[1.2em] text-white" data-testid="typing-text">{typedText}</span>
						<span class="animate-[blink_1s_step-end_infinite] text-accent-primary">▋</span>
					</div>
				</div>
			</div>
			<div class="flex flex-wrap justify-center gap-6">
				<a
					href="#about"
					onclick={(e) => handleNavClick(e, '#about')}
					class="inline-block border border-border px-6 py-3 font-(family-name:--font-family-mono) text-base text-text-secondary transition-all duration-(--transition-fast) hover:border-accent-primary hover:text-accent-primary"
					data-testid="cta-about"
				>
					關於我
				</a>
				<a
					href="#portfolio"
					onclick={(e) => handleNavClick(e, '#portfolio')}
					class="inline-block border border-border px-6 py-3 font-(family-name:--font-family-mono) text-base text-text-secondary transition-all duration-(--transition-fast) hover:border-accent-primary hover:text-accent-primary"
					data-testid="cta-portfolio"
				>
					查看作品
				</a>
			</div>
		</div>
	</section>

	<!-- About + Education Section -->
	<section class="scroll-mt-20 bg-bg-secondary px-6 py-12" id="about" data-testid="about-section">
		<div class="mx-auto w-full max-w-max-width px-6">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<!-- About Column -->
				<div>
					<h2
						class="relative mb-12 inline-block font-family-display text-[clamp(2rem,5vw,2.5rem)] text-text-primary after:absolute after:bottom-[-0.5rem] after:left-0 after:h-0.75 after:w-full after:bg-[linear-gradient(90deg,var(--color-accent-primary),var(--color-accent-secondary))] after:content-['']"
					>
						關於我
					</h2>
					<div>
						<p class="mb-6 leading-[1.8] text-text-secondary">{resume.about}</p>
					</div>

					<!-- Contact & Social Links -->
					<div class="mt-12 scroll-mt-20" id="contact">
						<h3 class="my-12 mb-6 font-family-display text-2xl text-text-primary">聯絡方式</h3>
						<div class="mb-8 flex flex-col gap-4">
							<div
								class="flex items-center gap-4 p-2 text-text-secondary transition-colors duration-(--transition-fast) hover:text-accent-primary"
							>
								<img src={iconMap['mail']} alt="Email" class="h-5 w-5" />
								<span>{resume.email}</span>
							</div>
							<div
								class="flex items-center gap-4 p-2 text-text-secondary transition-colors duration-(--transition-fast) hover:text-accent-primary"
							>
								<img src={iconMap['location']} alt="Location" class="h-5 w-5" />
								<span>{resume.location}</span>
							</div>
						</div>

						<div class="flex flex-wrap gap-6">
							{#each socialLinks as social (social.name)}
								<a
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 border border-transparent bg-bg-tertiary px-6 py-4 transition-all duration-(--transition-base) hover:border-accent-primary hover:bg-bg-primary"
									data-testid={`social-${social.name.toLowerCase()}`}
								>
									<img src={iconMap[social.icon]} alt={social.name} class="h-6 w-6" />
									<span class="font-medium text-text-secondary">{social.name}</span>
								</a>
							{/each}
						</div>
					</div>
				</div>

				<!-- Education Column -->
				<div>
					<h2
						class="relative mb-12 inline-block font-family-display text-[clamp(2rem,5vw,2.5rem)] text-text-primary after:absolute after:bottom-[-0.5rem] after:left-0 after:h-0.75 after:w-full after:bg-[linear-gradient(90deg,var(--color-accent-primary),var(--color-accent-secondary))] after:content-['']"
					>
						學歷
					</h2>
					<div class="flex flex-col gap-4">
						{#each education as edu (edu.institution)}
							<div
								class="border-l-4 border-accent-primary bg-bg-tertiary px-6 py-4 transition-[border-color] duration-(--transition-base)"
								data-testid="education-card"
							>
								<h3 class="mb-1 font-medium text-text-secondary">{edu.institution}</h3>
								{#if edu.degree}
									<div class="mb-2 text-xl text-text-primary">{edu.degree}</div>
								{/if}
								<div class="text-sm text-accent-primary">{edu.period}</div>
								<div class="mb-4 text-sm text-text-muted">{edu.location}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Certificates Section -->
	<section
		class="scroll-mt-20 bg-bg-primary px-6 py-24"
		id="certificates"
		data-testid="certificates-section"
	>
		<div class="mx-auto w-full max-w-max-width px-6">
			<h2
				class="relative mb-12 inline-block font-family-display text-[clamp(2rem,5vw,2.5rem)] text-text-primary after:absolute after:bottom-[-0.5rem] after:left-0 after:h-0.75 after:w-full after:bg-[linear-gradient(90deg,var(--color-accent-primary),var(--color-accent-secondary))] after:content-['']"
			>
				證書與證照
			</h2>
			<div class="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
				{#each certificates as cert (cert.name)}
					<div
						class="flex flex-col gap-3 border border-border bg-bg-secondary p-6 transition-all duration-(--transition-base) hover:border-accent-primary"
						data-testid={`certificate-${cert.name.toLowerCase().replace(/\s+/g, '-')}`}
					>
						<h3 class="text-lg font-medium text-text-primary">{cert.name}</h3>
						<p class="text-sm text-text-secondary">{cert.issuer}</p>
						<p class="text-sm text-accent-primary">{cert.date}</p>
						{#if cert.credentialUrl}
							<a
								href={cert.credentialUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="mt-auto inline-flex items-center gap-2 text-sm text-text-muted transition-colors duration-(--transition-fast) hover:text-accent-primary"
							>
								查看證書 →
							</a>
						{/if}
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<section
		class="scroll-mt-20 bg-bg-primary px-6 py-24"
		id="skills"
		data-testid="tech-stack-section"
	>
		<div class="mx-auto w-full max-w-max-width px-6">
			<h2
				class="relative mb-12 inline-block font-family-display text-[clamp(2rem,5vw,2.5rem)] text-text-primary after:absolute after:bottom-[-0.5rem] after:left-0 after:h-0.75 after:w-full after:bg-[linear-gradient(90deg,var(--color-accent-primary),var(--color-accent-secondary))] after:content-['']"
			>
				技能
			</h2>
			<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
				{#each skillCategories as category (category.category)}
					<div
						class="border border-border bg-bg-secondary p-8 transition-all duration-(--transition-base) hover:border-accent-primary"
						data-testid={`tech-category-${category.category.toLowerCase()}`}
					>
						<h3 class="mb-6 text-xl text-accent-primary">{category.category}</h3>
						<div class="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-6">
							{#each category.skills as skill (skill.name)}
								<div
									class="flex flex-col items-center gap-2 border border-transparent bg-bg-tertiary p-6 transition-all duration-(--transition-base) hover:border-accent-primary"
									data-testid={`tech-skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
								>
									<img src={iconMap[skill.icon]} alt={skill.name} class="h-8 w-8" />
									<span class="text-center text-sm font-medium text-text-secondary"
										>{skill.name}</span
									>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Portfolio Section -->
	<section
		class="scroll-mt-20 bg-bg-secondary px-6 py-24"
		id="portfolio"
		data-testid="portfolio-section"
	>
		<div class="mx-auto w-full max-w-max-width px-6">
			<h2
				class="relative mb-12 inline-block font-family-display text-[clamp(2rem,5vw,2.5rem)] text-text-primary after:absolute after:bottom-[-0.5rem] after:left-0 after:h-0.75 after:w-full after:bg-[linear-gradient(90deg,var(--color-accent-primary),var(--color-accent-secondary))] after:content-['']"
			>
				作品集
			</h2>

			<!-- Filter Buttons -->
			<div class="mb-16 flex flex-wrap justify-center gap-4" data-testid="portfolio-filters">
				{#each projectFilters as filter (filter.type)}
					<button
						class="border-2 border-transparent bg-bg-tertiary px-6 py-4 font-medium text-text-secondary transition-all duration-(--transition-base) hover:bg-bg-primary hover:text-text-primary {activeFilter ===
						filter.type
							? 'border-accent-primary bg-accent-primary text-white'
							: ''}"
						onclick={() => filterProjects(filter.type)}
						data-testid={`filter-${filter.type}`}
					>
						{filter.label}
					</button>
				{/each}
			</div>

			<!-- Projects Grid -->
			<div
				class="grid animate-[fadeIn_var(--transition-slow)] grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
				data-testid="projects-grid"
			>
				{#each filteredProjects as project (project.id)}
					<div
						class="flex flex-col gap-6 border border-border bg-bg-tertiary p-8 transition-all duration-(--transition-base) hover:border-accent-primary"
						data-testid={`project-${project.id}`}
					>
						<h3 class="mb-2 text-2xl text-text-primary">{project.title}</h3>
						<p class="grow leading-[1.6] text-text-secondary">{project.description}</p>

						<div class="flex flex-wrap gap-2">
							{#each project.technologies as tech (tech)}
								<span
									class="border border-border bg-bg-tertiary px-3 py-1 text-xs font-semibold text-accent-primary"
									>{tech}</span
								>
							{/each}
						</div>

						<div class="flex gap-6 border-t border-border pt-4">
							{#if project.githubUrl}
								<a
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 px-4 py-2 font-medium text-accent-primary transition-all duration-(--transition-fast) hover:translate-x-1 hover:bg-[rgba(79,70,229,0.1)]"
									data-testid={`project-github-${project.id}`}
									aria-label="查看 GitHub 專案"
								>
									<svg
										class="h-4.5 w-4.5"
										viewBox="0 0 24 24"
										fill="currentColor"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.91 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.59-2.805 5.61-5.475 5.91.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
										/>
									</svg>
									GitHub
								</a>
							{/if}
							{#if project.liveUrl}
								<a
									href={project.liveUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 px-4 py-2 font-medium text-accent-primary transition-all duration-(--transition-fast) hover:translate-x-1 hover:bg-[rgba(79,70,229,0.1)]"
									data-testid={`project-live-${project.id}`}
									aria-label="查看線上展示"
								>
									<svg
										class="h-4.5 w-4.5"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
										<polyline points="15 3 21 3 21 9" />
										<line x1="10" y1="14" x2="21" y2="3" />
									</svg>
									線上展示
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="mt-auto border-t border-border bg-bg-primary px-6 py-12" data-testid="footer">
		<div class="mx-auto w-full max-w-max-width px-6">
			<p class="text-left font-(family-name:--font-family-mono) text-xs text-text-muted">
				Copyright © {new Date().getFullYear()} Meng Che Hsieh. All rights reserved.
			</p>
		</div>
	</footer>
</div>
