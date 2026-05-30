<script lang="ts">
	import { resume, navLinks } from '$lib/data';
	import { handleNavClick, scrollToTop } from '$lib/utils';

	let mobileMenuOpen = $state(false);
	let mobileDrawerElement: HTMLElement | undefined = $state();
	let lastFocusedElement: HTMLElement | null = null;

	const focusableSelector = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

	function getFocusableElements(container: HTMLElement) {
		return Array.from(container.querySelectorAll<HTMLElement>(focusableSelector)).filter(
			(element) => element.offsetParent !== null
		);
	}

	function focusFirstDrawerElement() {
		if (!mobileDrawerElement) return;

		const [firstElement] = getFocusableElements(mobileDrawerElement);
		(firstElement ?? mobileDrawerElement).focus();
	}

	function closeMobileMenu(restoreFocus = true) {
		mobileMenuOpen = false;
		document.body.style.overflow = '';

		if (restoreFocus) {
			requestAnimationFrame(() => lastFocusedElement?.focus());
		}
	}

	function openMobileMenu() {
		lastFocusedElement =
			document.activeElement instanceof HTMLElement ? document.activeElement : null;
		mobileMenuOpen = true;
	}

	function toggleMobileMenu() {
		if (mobileMenuOpen) {
			closeMobileMenu();
		} else {
			openMobileMenu();
		}
	}

	function handleWindowKeydown(event: KeyboardEvent) {
		if (!mobileMenuOpen || !mobileDrawerElement) return;

		if (event.key === 'Escape') {
			closeMobileMenu();
			return;
		}

		if (event.key !== 'Tab') return;

		const focusableElements = getFocusableElements(mobileDrawerElement);
		const firstElement = focusableElements[0];
		const lastElement = focusableElements.at(-1);

		if (!firstElement || !lastElement) {
			event.preventDefault();
			mobileDrawerElement.focus();
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
		if (mobileMenuOpen) {
			document.body.style.overflow = 'hidden';
			requestAnimationFrame(focusFirstDrawerElement);
		} else {
			document.body.style.overflow = '';
		}

		return () => {
			document.body.style.overflow = '';
		};
	});
</script>

<svelte:window onkeydown={handleWindowKeydown} />

<a
	href="#main-content"
	class="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[calc(var(--z-drawer)+20)] focus:bg-bg-tertiary focus:px-4 focus:py-3 focus:text-accent-primary"
>
	跳到主要內容
</a>

<!-- Navigation -->
<nav
	class="sticky top-0 z-(--z-nav) border-b border-border bg-bg-primary/95 py-4 backdrop-blur-[10px]"
	aria-label="主要導覽"
	data-testid="navigation"
>
	<div class="mx-auto flex max-w-max-width items-center justify-between px-6">
		<button
			class="font-family-display text-2xl font-bold text-accent-primary transition-transform duration-(--transition-fast) hover:scale-105"
			type="button"
			onclick={scrollToTop}
			data-testid="logo"
		>
			{resume.name}
		</button>

		<!-- Desktop Navigation -->
		<div class="hidden gap-8 font-family-display md:flex" data-testid="desktop-nav">
			{#each navLinks as link (link.href)}
				<a
					href={link.href}
					onclick={(e) => handleNavClick(e, link.href)}
					class="relative font-medium text-text-secondary transition-colors duration-(--transition-fast) after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent-primary after:transition-[width] after:duration-(--transition-base) after:content-[''] hover:text-accent-primary hover:after:w-full"
					data-testid={`nav-link-${link.id}`}
				>
					{link.label}
				</a>
			{/each}
		</div>

		<!-- Mobile Hamburger -->
		<button
			class="z-[calc(var(--z-drawer)+10)] flex flex-col gap-1.25 p-2 md:hidden"
			type="button"
			onclick={toggleMobileMenu}
			aria-label="開啟選單"
			aria-expanded={mobileMenuOpen}
			aria-controls="mobile-menu-drawer"
			data-testid="hamburger-button"
		>
			<span
				class="h-0.5 w-6.25 bg-text-primary transition-[background-color,opacity,transform] duration-(--transition-base)"
			></span>
			<span
				class="h-0.5 w-6.25 bg-text-primary transition-[background-color,opacity,transform] duration-(--transition-base)"
			></span>
			<span
				class="h-0.5 w-6.25 bg-text-primary transition-[background-color,opacity,transform] duration-(--transition-base)"
			></span>
		</button>
	</div>
</nav>

<!-- Mobile Menu Drawer -->
{#if mobileMenuOpen}
	<button
		type="button"
		class="fixed inset-0 z-(--z-overlay) animate-[fadeIn_var(--transition-base)] bg-black/70"
		onclick={() => closeMobileMenu()}
		aria-label="關閉選單"
		data-testid="mobile-overlay"
	></button>
	<div
		id="mobile-menu-drawer"
		bind:this={mobileDrawerElement}
		class="fixed top-0 bottom-0 left-0 z-(--z-drawer) w-70 max-w-[80vw] animate-[slideInLeft_var(--transition-slow)] overflow-y-auto overscroll-contain bg-bg-secondary p-8"
		role="dialog"
		aria-modal="true"
		aria-labelledby="mobile-menu-title"
		tabindex="-1"
		data-testid="mobile-drawer"
	>
		<div class="mb-12 flex items-center justify-between">
			<span
				id="mobile-menu-title"
				class="font-family-display text-2xl font-bold text-accent-primary">選單</span
			>
			<button
				class="p-2 text-[2rem] text-text-secondary transition-colors duration-(--transition-fast) hover:text-accent-primary"
				type="button"
				onclick={() => closeMobileMenu()}
				aria-label="關閉選單"
				data-testid="close-menu-button"
			>
				✕
			</button>
		</div>
		<nav class="flex flex-col gap-6" aria-label="行動導覽">
			{#each navLinks as link (link.href)}
				<a
					href={link.href}
					onclick={(e) => handleNavClick(e, link.href, () => closeMobileMenu(false))}
					class="p-4 text-lg font-medium text-text-primary transition-[color,background-color,transform] duration-(--transition-fast) hover:translate-x-2 hover:bg-bg-tertiary hover:text-accent-primary"
					data-testid={`mobile-nav-link-${link.id}`}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</div>
{/if}
