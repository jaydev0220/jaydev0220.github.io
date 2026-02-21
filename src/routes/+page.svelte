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
		type ProjectType,
		type Project
	} from '$lib/data';
	import { onMount } from 'svelte';

	// Mobile menu state
	let mobileMenuOpen = $state(false);

	// Typing animation state
	let typedText = $state('');
	let currentStringIndex = $state(0);
	let currentCharIndex = $state(0);
	let isDeleting = $state(false);

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

		return () => {
			clearTimeout(timeout);
		};
	});

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
		class="sticky top-0 z-[var(--z-nav)] border-b border-border bg-bg-primary/95 py-4 backdrop-blur-[10px]"
		data-testid="navigation"
	>
		<div class="mx-auto flex max-w-[1200px] items-center justify-between px-6">
			<button
				class="font-[family-name:var(--font-family-display)] text-2xl font-bold text-accent-primary transition-transform duration-[var(--transition-fast)] hover:scale-105"
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
						class="relative font-medium text-text-secondary transition-colors duration-[var(--transition-fast)] after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:w-0 after:bg-accent-primary after:transition-[width] after:duration-[var(--transition-base)] after:content-[''] hover:text-accent-primary hover:after:w-full"
						data-testid={`nav-link-${link.id}`}
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Mobile Hamburger -->
			<button
				class="z-[calc(var(--z-drawer)+10)] flex flex-col gap-[5px] p-2 md:hidden"
				onclick={toggleMobileMenu}
				aria-label="Toggle menu"
				data-testid="hamburger-button"
			>
				<span
					class="h-[2px] w-[25px] bg-text-primary transition-all duration-[var(--transition-base)]"
				></span>
				<span
					class="h-[2px] w-[25px] bg-text-primary transition-all duration-[var(--transition-base)]"
				></span>
				<span
					class="h-[2px] w-[25px] bg-text-primary transition-all duration-[var(--transition-base)]"
				></span>
			</button>
		</div>
	</nav>

	<!-- Mobile Menu Drawer -->
	{#if mobileMenuOpen}
		<div
			class="fixed inset-0 z-[var(--z-overlay)] animate-[fadeIn_var(--transition-base)] bg-black/70"
			onclick={closeMobileMenu}
			onkeydown={(e) => e.key === 'Escape' && closeMobileMenu()}
			role="button"
			tabindex="-1"
			aria-label="Close menu"
			data-testid="mobile-overlay"
		></div>
		<div
			class="fixed top-0 bottom-0 left-0 z-[var(--z-drawer)] w-[280px] max-w-[80vw] animate-[slideInLeft_var(--transition-slow)] bg-bg-secondary p-8"
			data-testid="mobile-drawer"
		>
			<div class="mb-12 flex items-center justify-between">
				<span
					class="font-[family-name:var(--font-family-display)] text-2xl font-bold text-accent-primary"
					>選單</span
				>
				<button
					class="p-2 text-[2rem] text-text-secondary transition-colors duration-[var(--transition-fast)] hover:text-accent-primary"
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
						class="p-4 text-lg font-medium text-text-primary transition-all duration-[var(--transition-fast)] hover:translate-x-2 hover:bg-bg-tertiary hover:text-accent-primary"
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
		class="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg-primary px-6 py-16 before:absolute before:top-[-50%] before:right-[-50%] before:h-full before:w-full before:animate-[pulse_8s_ease-in-out_infinite] before:bg-[radial-gradient(circle,rgba(79,70,229,0.05)_0%,transparent_70%)] before:content-['']"
		data-testid="hero-section"
	>
		<div class="z-[1] w-full">
			<div class="mb-12 overflow-hidden bg-transparent">
				<div class="flex items-center border-b border-border bg-bg-tertiary px-4 py-2">
					<span class="font-[family-name:var(--font-family-mono)] text-xs text-text-muted"
						>user@arch ~</span
					>
				</div>
				<div class="flex min-h-[120px] items-center p-8">
					<div
						class="flex items-center gap-4 font-[family-name:var(--font-family-mono)] text-[clamp(1.25rem,4vw,1.75rem)] text-white"
					>
						<span class="font-bold text-accent-primary">[user@host]:~ $</span>
						<span class="min-h-[1.2em] text-white" data-testid="typing-text">{typedText}</span>
						<span class="animate-[blink_1s_step-end_infinite] text-accent-primary">▋</span>
					</div>
				</div>
			</div>
			<div class="flex flex-wrap justify-center gap-6">
				<a
					href="#about"
					onclick={(e) => handleNavClick(e, '#about')}
					class="inline-block px-4 py-2 font-[family-name:var(--font-family-mono)] text-base text-text-secondary transition-colors duration-[var(--transition-fast)] hover:text-accent-primary"
					data-testid="cta-about"
				>
					$ ./about --me
				</a>
				<a
					href="#portfolio"
					onclick={(e) => handleNavClick(e, '#portfolio')}
					class="inline-block px-4 py-2 font-[family-name:var(--font-family-mono)] text-base text-text-secondary transition-colors duration-[var(--transition-fast)] hover:text-accent-primary"
					data-testid="cta-portfolio"
				>
					$ ls ~/projects
				</a>
			</div>
		</div>
	</section>

	<!-- About + Education Section -->
	<section class="bg-bg-secondary px-6 py-12" id="about" data-testid="about-section">
		<div class="mx-auto w-full max-w-[1200px] px-6">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<!-- About Column -->
				<div>
					<h2
						class="relative mb-12 inline-block font-[family-name:var(--font-family-display)] text-[clamp(2rem,5vw,2.5rem)] text-text-primary after:absolute after:bottom-[-0.5rem] after:left-0 after:h-[3px] after:w-full after:bg-[linear-gradient(90deg,var(--color-accent-primary),var(--color-accent-secondary))] after:content-['']"
					>
						關於我
					</h2>
					<div>
						<p class="mb-6 leading-[1.8] text-text-secondary">{resume.about}</p>
					</div>

					<!-- Contact & Social Links -->
					<div class="mt-12" id="contact">
						<h3
							class="my-12 mb-6 font-[family-name:var(--font-family-display)] text-2xl text-text-primary"
						>
							聯絡方式
						</h3>
						<div class="mb-8 flex flex-col gap-4">
							<div
								class="flex items-center gap-4 p-2 text-text-secondary transition-colors duration-[var(--transition-fast)] hover:text-accent-primary"
							>
								<span class="text-xl">[email]</span>
								<span>{resume.email}</span>
							</div>
							<div
								class="flex items-center gap-4 p-2 text-text-secondary transition-colors duration-[var(--transition-fast)] hover:text-accent-primary"
							>
								<span class="text-xl">[location]</span>
								<span>{resume.location}</span>
							</div>
						</div>

						<div class="flex flex-wrap gap-6">
							{#each socialLinks as social (social.name)}
								<a
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									class="flex items-center gap-2 border border-transparent bg-bg-tertiary px-6 py-4 transition-all duration-[var(--transition-base)] hover:border-accent-primary hover:bg-bg-primary"
									data-testid={`social-${social.name.toLowerCase()}`}
								>
									<span class="text-2xl">[{social.icon}]</span>
									<span class="font-medium text-text-secondary">{social.name}</span>
								</a>
							{/each}
						</div>
					</div>
				</div>

				<!-- Education Column -->
				<div>
					<h2
						class="relative mb-12 inline-block font-[family-name:var(--font-family-display)] text-[clamp(2rem,5vw,2.5rem)] text-text-primary after:absolute after:bottom-[-0.5rem] after:left-0 after:h-[3px] after:w-full after:bg-[linear-gradient(90deg,var(--color-accent-primary),var(--color-accent-secondary))] after:content-['']"
					>
						學歷
					</h2>
					<div class="flex flex-col gap-4">
						{#each education as edu (edu.institution)}
							<div
								class="border-l-4 border-accent-primary bg-bg-tertiary px-6 py-4 transition-[border-color] duration-[var(--transition-base)]"
								data-testid="education-card"
							>
								<h3 class="mb-1 font-medium text-text-secondary">{edu.institution}</h3>
								{#if edu.degree}
									<div class="mb-2 text-xl text-text-primary">{edu.degree}</div>
								{/if}
								<div class="mb-4 text-sm text-text-muted">{edu.location}</div>
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Skills Section -->
	<section class="bg-bg-primary px-6 py-24" id="skills" data-testid="tech-stack-section">
		<div class="mx-auto w-full max-w-[1200px] px-6">
			<h2
				class="relative mb-12 inline-block font-[family-name:var(--font-family-display)] text-[clamp(2rem,5vw,2.5rem)] text-text-primary after:absolute after:bottom-[-0.5rem] after:left-0 after:h-[3px] after:w-full after:bg-[linear-gradient(90deg,var(--color-accent-primary),var(--color-accent-secondary))] after:content-['']"
			>
				技能
			</h2>
			<div class="grid grid-cols-1 gap-12 md:grid-cols-2">
				{#each skillCategories as category (category.category)}
					<div
						class="border border-border bg-bg-secondary p-8 transition-all duration-[var(--transition-base)] hover:border-accent-primary"
						data-testid={`tech-category-${category.category.toLowerCase()}`}
					>
						<h3 class="mb-6 text-xl text-accent-primary">{category.category}</h3>
						<div class="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-6">
							{#each category.skills as skill (skill.name)}
								<div
									class="flex flex-col items-center gap-2 border border-transparent bg-bg-tertiary p-6 transition-all duration-[var(--transition-base)] hover:border-accent-primary"
									data-testid={`tech-skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
								>
									<span class="text-[2rem]">{skill.icon}</span>
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
	<section class="bg-bg-secondary px-6 py-24" id="portfolio" data-testid="portfolio-section">
		<div class="mx-auto w-full max-w-[1200px] px-6">
			<h2
				class="relative mb-12 inline-block font-[family-name:var(--font-family-display)] text-[clamp(2rem,5vw,2.5rem)] text-text-primary after:absolute after:bottom-[-0.5rem] after:left-0 after:h-[3px] after:w-full after:bg-[linear-gradient(90deg,var(--color-accent-primary),var(--color-accent-secondary))] after:content-['']"
			>
				作品集
			</h2>

			<!-- Filter Buttons -->
			<div class="mb-16 flex flex-wrap justify-center gap-4" data-testid="portfolio-filters">
				{#each projectFilters as filter (filter.type)}
					<button
						class="border-2 border-transparent bg-bg-tertiary px-6 py-4 font-medium text-text-secondary transition-all duration-[var(--transition-base)] hover:bg-bg-primary hover:text-text-primary {activeFilter ===
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
						class="flex flex-col gap-6 border border-border bg-bg-tertiary p-8 transition-all duration-[var(--transition-base)] hover:border-accent-primary"
						data-testid={`project-${project.id}`}
					>
						<h3 class="mb-2 text-2xl text-text-primary">{project.title}</h3>
						<p class="flex-grow leading-[1.6] text-text-secondary">{project.description}</p>

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
									class="flex items-center gap-2 px-4 py-2 font-medium text-accent-primary transition-all duration-[var(--transition-fast)] hover:translate-x-1 hover:bg-[rgba(79,70,229,0.1)]"
									data-testid={`project-github-${project.id}`}
									aria-label="查看 GitHub 專案"
								>
									<svg
										class="h-[18px] w-[18px]"
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
									class="flex items-center gap-2 px-4 py-2 font-medium text-accent-primary transition-all duration-[var(--transition-fast)] hover:translate-x-1 hover:bg-[rgba(79,70,229,0.1)]"
									data-testid={`project-live-${project.id}`}
									aria-label="查看線上展示"
								>
									<svg
										class="h-[18px] w-[18px]"
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
		<div class="mx-auto w-full max-w-[1200px] px-6">
			<p class="text-left font-[family-name:var(--font-family-mono)] text-xs text-text-muted">
				Copyright © {new Date().getFullYear()} Meng Che Hsieh. All rights reserved.
			</p>
		</div>
	</footer>
</div>
