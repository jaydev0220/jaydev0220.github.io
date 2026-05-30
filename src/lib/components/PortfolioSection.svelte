<script lang="ts">
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';
	import { projects, projectFilters, type ProjectType, type Project } from '$lib/data';

	let activeFilter = $state<ProjectType>('all');
	let filteredProjects = $derived<Project[]>(
		activeFilter === 'all'
			? projects
			: projects.filter((project) => project.type.includes(activeFilter))
	);

	function getProjectFilter(filter: string | null): ProjectType {
		const projectFilter = projectFilters.find(({ type }) => type === filter);

		return projectFilter?.type ?? 'all';
	}

	function getProjectId(project: Project) {
		return project.title
			.toLowerCase()
			.replace(/[^a-z0-9]+/g, '-')
			.replace(/^-|-$/g, '');
	}

	function applyFilterFromUrl() {
		activeFilter = getProjectFilter(new URLSearchParams(window.location.search).get('filter'));
	}

	function updateFilterUrl(type: ProjectType) {
		const nextUrl = new URL(window.location.href);
		if (type === 'all') {
			nextUrl.searchParams.delete('filter');
		} else {
			nextUrl.searchParams.set('filter', type);
		}

		window.history.pushState(window.history.state, '', nextUrl);
	}

	function filterProjects(type: ProjectType) {
		if (activeFilter === type) return;

		activeFilter = type;
		updateFilterUrl(type);
	}

	onMount(() => {
		applyFilterFromUrl();
		window.addEventListener('popstate', applyFilterFromUrl);

		return () => {
			window.removeEventListener('popstate', applyFilterFromUrl);
		};
	});

	const projectCardClasses =
		'flex min-w-0 flex-col gap-6 border border-border bg-bg-tertiary p-8 transition-[border-color,transform] duration-(--transition-base) hover:-translate-y-0.5 hover:border-accent-primary';
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
					type="button"
					class="border-2 border-transparent bg-bg-tertiary px-6 py-4 font-medium text-text-secondary transition-[color,background-color,border-color,transform] duration-(--transition-base) hover:-translate-y-0.5 hover:bg-bg-primary hover:text-text-primary {activeFilter ===
					filter.type
						? 'border-accent-primary bg-accent-primary text-bg-primary'
						: ''}"
					onclick={() => filterProjects(filter.type)}
					aria-pressed={activeFilter === filter.type}
					data-testid={`filter-${filter.type}`}
				>
					{filter.label}
				</button>
			{/each}
		</div>

		<!-- Projects Grid -->
		<div
			class="grid animate-[fadeIn_var(--transition-slow)] auto-rows-fr grid-cols-1 justify-center gap-8 md:grid-cols-[repeat(2,minmax(0,22rem))] lg:grid-cols-[repeat(3,minmax(0,22rem))]"
			data-testid="projects-grid"
		>
			{#each filteredProjects as project (project.title)}
				<div class={projectCardClasses} data-testid={`project-${getProjectId(project)}`}>
					<h3 class="mb-2 text-2xl wrap-break-word text-text-primary">{project.title}</h3>
					<p class="grow leading-[1.6] wrap-break-word text-text-secondary">
						{project.description}
					</p>

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
								class="flex items-center gap-2 px-4 py-2 font-medium transition-[background-color,transform] duration-(--transition-fast) hover:translate-x-1 hover:bg-[rgba(132,204,22,0.1)]"
								data-testid={`project-github-${getProjectId(project)}`}
								aria-label="查看 GitHub 專案"
							>
								<Icon icon="simple-icons:github" width="24" height="24" aria-hidden="true" />
								<span class="text-accent-primary">GitHub</span>
							</a>
						{/if}
						{#if project.liveUrl}
							<a
								href={project.liveUrl}
								target="_blank"
								rel="noopener noreferrer"
								class="flex items-center gap-2 px-4 py-2 font-medium transition-[background-color,transform] duration-(--transition-fast) hover:translate-x-1 hover:bg-[rgba(132,204,22,0.1)]"
								data-testid={`project-live-${getProjectId(project)}`}
								aria-label="查看線上展示"
							>
								<Icon icon="lucide:external-link" width="24" height="24" aria-hidden="true" />
								<span class="text-accent-primary">Demo</span>
							</a>
						{/if}
					</div>
				</div>
			{/each}
		</div>
	</div>
</section>
