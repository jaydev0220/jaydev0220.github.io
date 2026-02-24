<script lang="ts">
	import { skillCategories } from '$lib/data';
	import { iconMap } from '$lib/iconMap';
	import { onMount } from 'svelte';
	import { SvelteSet } from 'svelte/reactivity';

	let expandedCategories = new SvelteSet<string>();

	onMount(() => {
		const isDesktop = window.matchMedia('(min-width: 768px)').matches;
		if (isDesktop) {
			skillCategories.forEach((c) => expandedCategories.add(c.category));
		}

		const mediaQuery = window.matchMedia('(min-width: 768px)');
		const handleMediaChange = (e: MediaQueryListEvent) => {
			expandedCategories.clear();
			if (e.matches) {
				skillCategories.forEach((c) => expandedCategories.add(c.category));
			}
		};
		mediaQuery.addEventListener('change', handleMediaChange);

		return () => {
			mediaQuery.removeEventListener('change', handleMediaChange);
		};
	});

	function toggleCategory(category: string) {
		if (expandedCategories.has(category)) {
			expandedCategories.delete(category);
		} else {
			expandedCategories.add(category);
		}
	}
</script>

<!-- Skills Section -->
<section class="scroll-mt-20 bg-bg-primary px-6 py-24" id="skills" data-testid="tech-stack-section">
	<div class="mx-auto w-full max-w-max-width px-6">
		<h2
			class="relative mb-12 inline-block font-family-display text-[clamp(2rem,5vw,2.5rem)] text-text-primary after:absolute after:bottom-[-0.5rem] after:left-0 after:h-0.75 after:w-full after:bg-[linear-gradient(90deg,var(--color-accent-primary),var(--color-accent-secondary))] after:content-['']"
		>
			技能
		</h2>
		<div class="grid grid-cols-1 gap-12 md:grid-cols-2 md:items-start">
			{#each skillCategories as category (category.category)}
				<div
					class="border border-border bg-bg-secondary transition-all duration-(--transition-base) hover:border-accent-primary"
					data-testid={`tech-category-${category.category.toLowerCase()}`}
				>
					<button
						class="flex w-full items-center justify-between p-8 text-left"
						onclick={() => toggleCategory(category.category)}
						aria-expanded={expandedCategories.has(category.category)}
						data-testid={`tech-category-toggle-${category.category.toLowerCase()}`}
					>
						<h3 class="text-xl text-accent-primary">{category.category}</h3>
						<span
							class="text-text-secondary transition-transform duration-(--transition-base) {expandedCategories.has(
								category.category
							)
								? 'rotate-180'
								: ''}"
						>
							▾
						</span>
					</button>
					{#if expandedCategories.has(category.category)}
						<div class="px-8 pb-8">
							<div class="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-6">
								{#each category.skills as skill (skill.name)}
									<div
										class="flex flex-col items-center gap-2 border border-transparent bg-bg-tertiary p-6 transition-all duration-(--transition-base) hover:border-accent-primary"
										data-testid={`tech-skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
									>
										<img
											src={iconMap[skill.icon]}
											alt={skill.name}
											loading="lazy"
											class="h-8 w-auto"
										/>
										<span class="text-center text-sm font-medium text-text-secondary"
											>{skill.name}</span
										>
									</div>
								{/each}
							</div>
						</div>
					{/if}
				</div>
			{/each}
		</div>
	</div>
</section>
