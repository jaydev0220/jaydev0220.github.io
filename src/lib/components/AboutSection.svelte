<script lang="ts">
	import { resume, education, socialLinks } from '$lib/data';
	import { iconMap } from '$lib/iconMap';
</script>

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
					{#each resume.about as line, i (i)}
						<p class="leading-[1.8] text-text-secondary">{line}</p>
					{/each}
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
								class="flex items-center gap-2 border border-transparent bg-bg-tertiary px-3 py-4 transition-all duration-(--transition-base) hover:border-accent-primary hover:bg-bg-primary md:px-6"
								data-testid={`social-${social.name.toLowerCase()}`}
							>
								<img src={iconMap[social.icon]} alt={social.name} class="h-6 w-6" />
								<span class="hidden font-medium text-text-secondary md:inline">{social.name}</span>
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
