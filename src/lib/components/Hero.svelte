<script lang="ts">
	import { typingStrings } from '$lib/data';
	import { handleNavClick } from '$lib/utils';
	import { onMount } from 'svelte';

	let typedText = $state('');
	let currentStringIndex = $state(0);
	let currentCharIndex = $state(0);
	let isDeleting = $state(false);

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
</script>

<!-- Hero Section -->
<section
	class="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-bg-primary px-6 py-12 before:absolute before:top-[-50%] before:right-[-50%] before:h-full before:w-full before:animate-[pulse_8s_ease-in-out_infinite] before:content-['']"
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
