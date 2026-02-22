<script lang="ts">
	import { projects, projectFilters, type ProjectType, type Project } from '$lib/data';

	let activeFilter = $state<ProjectType>('all');
	let filteredProjects = $state<Project[]>(projects);

	function filterProjects(type: ProjectType) {
		activeFilter = type;

		if (type === 'all') {
			filteredProjects = projects;
		} else {
			filteredProjects = projects.filter((project) => project.type.includes(type));
		}
	}
</script>

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
								class="flex items-center gap-2 px-4 py-2 font-medium text-accent-primary transition-all duration-(--transition-fast) hover:translate-x-1 hover:bg-[rgba(132,204,22,0.1)]"
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
								class="flex items-center gap-2 px-4 py-2 font-medium text-accent-primary transition-all duration-(--transition-fast) hover:translate-x-1 hover:bg-[rgba(132,204,22,0.1)]"
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
								Demo
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
