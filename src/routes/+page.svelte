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

<div class="site-wrapper">
	<!-- Navigation -->
	<nav class="nav" data-testid="navigation">
		<div class="nav-container">
			<button class="logo" onclick={scrollToTop} data-testid="logo">
				{resume.name}
			</button>

			<!-- Desktop Navigation -->
			<div class="nav-links-desktop" data-testid="desktop-nav">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						onclick={(e) => handleNavClick(e, link.href)}
						class="nav-link"
						data-testid={`nav-link-${link.label.toLowerCase()}`}
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Mobile Hamburger -->
			<button
				class="hamburger"
				onclick={toggleMobileMenu}
				aria-label="Toggle menu"
				data-testid="hamburger-button"
			>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
				<span class="hamburger-line"></span>
			</button>
		</div>
	</nav>

	<!-- Mobile Menu Drawer -->
	{#if mobileMenuOpen}
		<div
			class="mobile-menu-overlay"
			onclick={closeMobileMenu}
			onkeydown={(e) => e.key === 'Escape' && closeMobileMenu()}
			role="button"
			tabindex="-1"
			aria-label="Close menu"
			data-testid="mobile-overlay"
		></div>
		<div class="mobile-menu-drawer" data-testid="mobile-drawer">
			<div class="mobile-menu-header">
				<span class="mobile-menu-title">Menu</span>
				<button
					class="mobile-menu-close"
					onclick={closeMobileMenu}
					aria-label="Close menu"
					data-testid="close-menu-button"
				>
					✕
				</button>
			</div>
			<nav class="mobile-nav-links">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						onclick={(e) => handleNavClick(e, link.href)}
						class="mobile-nav-link"
						data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
					>
						{link.label}
					</a>
				{/each}
			</nav>
		</div>
	{/if}

	<!-- Hero Section -->
	<section class="hero" data-testid="hero-section">
		<div class="hero-container">
			<div class="terminal">
				<div class="terminal-header">
					<span class="terminal-dot terminal-dot-red"></span>
					<span class="terminal-dot terminal-dot-yellow"></span>
					<span class="terminal-dot terminal-dot-green"></span>
				</div>
				<div class="terminal-body">
					<div class="terminal-line">
						<span class="terminal-prompt">$</span>
						<span class="terminal-text" data-testid="typing-text">{typedText}</span>
						<span class="terminal-cursor">▋</span>
					</div>
				</div>
			</div>
			<div class="hero-cta">
				<a
					href="#about"
					onclick={(e) => handleNavClick(e, '#about')}
					class="btn btn-primary"
					data-testid="cta-about"
				>
					Get to Know Me
				</a>
				<a
					href="#portfolio"
					onclick={(e) => handleNavClick(e, '#portfolio')}
					class="btn btn-secondary"
					data-testid="cta-portfolio"
				>
					View Portfolio
				</a>
			</div>
		</div>
	</section>

	<!-- About + Education Section -->
	<section class="about-education" id="about" data-testid="about-section">
		<div class="container">
			<div class="about-education-grid">
				<!-- About Column -->
				<div class="about-column">
					<h2 class="section-title">About Me</h2>
					<div class="about-content">
						{#each resume.aboutExtended as paragraph, index (index)}
							<p class="about-paragraph">{paragraph}</p>
						{/each}
					</div>

					<!-- Contact & Social Links -->
					<div class="contact-section" id="contact">
						<h3 class="subsection-title">Let's Connect</h3>
						<div class="contact-info">
							<a href={`mailto:${resume.email}`} class="contact-item">
								<span class="contact-icon">📧</span>
								<span>{resume.email}</span>
							</a>
							<a href={`tel:${resume.phone}`} class="contact-item">
								<span class="contact-icon">📱</span>
								<span>{resume.phone}</span>
							</a>
							<div class="contact-item">
								<span class="contact-icon">📍</span>
								<span>{resume.location}</span>
							</div>
						</div>

						<div class="social-links">
							{#each socialLinks as social (social.name)}
								<a
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									class="social-link"
									data-testid={`social-${social.name.toLowerCase()}`}
								>
									<span class="social-icon">{social.icon}</span>
									<span class="social-name">{social.name}</span>
								</a>
							{/each}
						</div>
					</div>
				</div>

				<!-- Education Column -->
				<div class="education-column">
					<h2 class="section-title">Education</h2>
					<div class="education-timeline">
						{#each education as edu (edu.degree + edu.institution)}
							<div class="education-card" data-testid="education-card">
								<div class="education-period">{edu.period}</div>
								<h3 class="education-degree">{edu.degree}</h3>
								<div class="education-institution">{edu.institution}</div>
								<div class="education-location">{edu.location}</div>
								{#if edu.description}
									<p class="education-description">{edu.description}</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			</div>
		</div>
	</section>

	<!-- Tech Stack Section -->
	<section class="tech-stack" id="tech-stack" data-testid="tech-stack-section">
		<div class="container">
			<h2 class="section-title">Tech Stack</h2>
			<div class="tech-categories">
				{#each skillCategories as category (category.category)}
					<div
						class="tech-category"
						data-testid={`tech-category-${category.category.toLowerCase()}`}
					>
						<h3 class="tech-category-title">{category.category}</h3>
						<div class="tech-skills-grid">
							{#each category.skills as skill (skill.name)}
								<div
									class="tech-skill"
									data-testid={`tech-skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
								>
									<span class="tech-icon">{skill.icon}</span>
									<span class="tech-name">{skill.name}</span>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Portfolio Section -->
	<section class="portfolio" id="portfolio" data-testid="portfolio-section">
		<div class="container">
			<h2 class="section-title">Portfolio</h2>

			<!-- Filter Buttons -->
			<div class="portfolio-filters" data-testid="portfolio-filters">
				{#each projectFilters as filter (filter.type)}
					<button
						class="filter-btn"
						class:active={activeFilter === filter.type}
						onclick={() => filterProjects(filter.type)}
						data-testid={`filter-${filter.type}`}
					>
						{filter.label}
					</button>
				{/each}
			</div>

			<!-- Projects Grid -->
			<div class="projects-grid" data-testid="projects-grid">
				{#each filteredProjects as project (project.id)}
					<div class="project-card" data-testid={`project-${project.id}`}>
						<h3 class="project-title">{project.title}</h3>
						<p class="project-description">{project.description}</p>

						<div class="project-tech-tags">
							{#each project.technologies as tech (tech)}
								<span class="tech-tag">{tech}</span>
							{/each}
						</div>

						<div class="project-links">
							{#if project.githubUrl}
								<a
									href={project.githubUrl}
									target="_blank"
									rel="noopener noreferrer"
									class="project-link"
									data-testid={`project-github-${project.id}`}
									aria-label="View on GitHub"
								>
									<svg
										class="project-icon"
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
									class="project-link"
									data-testid={`project-live-${project.id}`}
									aria-label="View live demo"
								>
									<svg
										class="project-icon"
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
									Live Demo
								</a>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>

	<!-- Footer -->
	<footer class="footer" data-testid="footer">
		<div class="container">
			<p class="footer-text">Copyright © {new Date().getFullYear()}</p>
		</div>
	</footer>
</div>

<style>
	/* Component-scoped styles are in layout.css */
</style>
