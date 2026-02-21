<script lang="ts">
	import { certificates } from '$lib/data';
	import CertificateModal from './CertificateModal.svelte';

	let selectedCert = $state<{ name: string; url: string } | null>(null);

	function isValidCredentialUrl(url?: string): boolean {
		return !!url && !url.endsWith('/');
	}
</script>

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
					{#if isValidCredentialUrl(cert.credentialUrl)}
						<button
							onclick={() => (selectedCert = { name: cert.name, url: cert.credentialUrl! })}
							class="mt-auto inline-flex cursor-pointer items-center gap-2 text-sm text-text-muted transition-colors duration-(--transition-fast) hover:text-accent-primary"
						>
							查看證書 →
						</button>
					{/if}
				</div>
			{/each}
		</div>
	</div>

	<CertificateModal
		imageUrl={selectedCert?.url ?? ''}
		title={selectedCert?.name ?? ''}
		isOpen={selectedCert !== null}
		onClose={() => (selectedCert = null)}
	/>
</section>
