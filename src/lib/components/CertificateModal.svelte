<script lang="ts">
	let {
		imageUrl,
		title,
		isOpen,
		onClose
	}: {
		imageUrl: string;
		title: string;
		isOpen: boolean;
		onClose: () => void;
	} = $props();

	let dialogElement: HTMLElement | undefined = $state();
	let lastFocusedElement: HTMLElement | null = null;

	const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

	function getFocusableElements(container: HTMLElement) {
		return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
			(element) => element.offsetParent !== null
		);
	}

	function focusFirstDialogElement() {
		if (!dialogElement) return;

		const [firstElement] = getFocusableElements(dialogElement);
		(firstElement ?? dialogElement).focus();
	}

	function closeDialog() {
		onClose();
		requestAnimationFrame(() => lastFocusedElement?.focus());
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (!isOpen || !dialogElement) return;

		if (event.key === 'Escape') {
			closeDialog();
			return;
		}

		if (event.key !== 'Tab') return;

		const focusableElements = getFocusableElements(dialogElement);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements.at(-1);

		if (!firstElement || !lastElement) {
			event.preventDefault();
			dialogElement.focus();
			return;
		}

		if (event.shiftKey && document.activeElement === firstElement) {
			event.preventDefault();
			lastElement.focus();
		} else if (!event.shiftKey && document.activeElement === lastElement) {
			event.preventDefault();
			firstElement.focus();
		}
	}

	$effect(() => {
		if (isOpen) {
			lastFocusedElement =
				document.activeElement instanceof HTMLElement ? document.activeElement : null;
			document.body.style.overflow = 'hidden';
			requestAnimationFrame(focusFirstDialogElement);
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleWindowKeydown} />

{#if isOpen}
	<div
		class="fixed inset-0 z-300 flex animate-[fadeIn_var(--transition-base)] items-center justify-center overscroll-contain"
	>
		<button
			type="button"
			class="absolute inset-0 bg-black/80"
			aria-label="關閉證書預覽"
			onclick={closeDialog}
		></button>
		<div
			bind:this={dialogElement}
			class="relative z-1 mx-4 flex max-h-[90vh] w-full max-w-4xl flex-col border border-border bg-bg-secondary"
			role="dialog"
			aria-modal="true"
			aria-labelledby="certificate-modal-title"
			tabindex="-1"
		>
			<div class="flex items-center justify-between border-b border-border px-6 py-4">
				<h3 id="certificate-modal-title" class="text-lg font-medium text-text-primary">{title}</h3>
				<button
					type="button"
					onclick={closeDialog}
					class="text-text-muted transition-colors duration-(--transition-fast) hover:text-text-primary"
					aria-label="關閉"
				>
					✕
				</button>
			</div>
			<div class="flex items-center justify-center overflow-auto p-6">
				<img
					src={imageUrl}
					alt={title}
					width="1200"
					height="900"
					loading="lazy"
					decoding="async"
					class="max-h-[80vh] w-auto object-contain"
				/>
			</div>
		</div>
	</div>
{/if}
