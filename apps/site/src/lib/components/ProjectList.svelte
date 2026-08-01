<script lang="ts">
	import ExternalLinkIcon from '@iconify-svelte/tabler/external-link';
	import FolderOpenIcon from '@iconify-svelte/tabler/folder-open';
	import BrandGithubIcon from '@iconify-svelte/tabler/brand-github';
	import { localeFromUrl, text, type Project, type UrlLocale } from '@mengche/content';
	import { m } from '$lib/paraglide/messages.js';
	import { localizedPath } from '$lib/utils';

	let { projects, locale }: { projects: readonly Project[]; locale: UrlLocale } = $props();
	const contentLocale = $derived(localeFromUrl(locale));

	function actionLabel(label: Project['actions'][number]['label']): string {
		if (label === 'repository') return m.view_repository();
		return m.view_live_project();
	}
</script>

<div class="editorial-list">
	{#each projects as project, index (project.slug)}
		<article class="editorial-row">
			<span class="service-index">{String(index + 1).padStart(2, '0')}</span>
			<div class="flow" style="--flow-space: var(--space-3)">
				<p class="eyebrow">{text(project.category, contentLocale)}</p>
				<h3>
					{#if project.featured}
						<a href={localizedPath(locale, `/projects/${project.slug}`)}>{project.title}</a>
					{:else}
						{project.title}
					{/if}
				</h3>
				<p class="secondary-text">{text(project.summary, contentLocale)}</p>
				<ul class="tech-list">
					{#each project.technologies as technology (technology)}
						<li>{technology}</li>
					{/each}
				</ul>
			</div>
			<div class="cluster action-buttons">
				{#if project.featured}
					<a
						class="icon-button"
						href={localizedPath(locale, `/projects/${project.slug}`)}
						aria-label={m.view_project()}
						title={m.view_project()}
					>
						<FolderOpenIcon aria-hidden="true" />
					</a>
				{/if}
				{#each project.actions as action (`${project.slug}-${action.label}`)}
					<a
						class="icon-button"
						href={action.url}
						target="_blank"
						rel="noreferrer"
						aria-label={actionLabel(action.label)}
						title={actionLabel(action.label)}
					>
						{#if action.label === 'repository'}
							<BrandGithubIcon aria-hidden="true" />
						{:else}
							<ExternalLinkIcon aria-hidden="true" />
						{/if}
					</a>
				{/each}
			</div>
		</article>
	{/each}
</div>
