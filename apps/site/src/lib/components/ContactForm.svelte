<script lang="ts">
	import { PUBLIC_CONTACT_API_ORIGIN, PUBLIC_TURNSTILE_SITE_KEY } from '$env/static/public';
	import { localeFromUrl, services, site, text, type UrlLocale } from '@mengche/content';
	import type { InquiryErrorCode, InquiryResponse } from '@mengche/shared';
	import { onMount } from 'svelte';
	import { m } from '$lib/paraglide/messages.js';
	import { localizedPath } from '$lib/utils';

	let { locale }: { locale: UrlLocale } = $props();
	const contentLocale = $derived(localeFromUrl(locale));

	let form = $state({
		name: '',
		email: '',
		organization: '',
		service: 'marketing-site',
		budget: '25000-49999',
		timeline: '1-2-months',
		summary: '',
		privacyConsent: false
	});
	let turnstileToken = $state('');
	let submissionState = $state<'idle' | 'submitting' | 'success' | 'error'>('idle');
	let errorCode = $state<InquiryErrorCode | null>(null);

	onMount(() => {
		window.onMengcheTurnstile = (token: string) => {
			turnstileToken = token;
		};
		return () => {
			delete window.onMengcheTurnstile;
		};
	});

	function errorMessage(code: InquiryErrorCode | null): string {
		if (code === 'verification_failed') return m.form_verification_failed();
		if (code === 'rate_limited') return m.form_rate_limited();
		if (code === 'delivery_failed') return m.form_delivery_failed();
		return m.form_invalid_request();
	}

	async function submit(event: SubmitEvent) {
		event.preventDefault();
		if (!turnstileToken) {
			submissionState = 'error';
			errorCode = 'verification_failed';
			return;
		}

		submissionState = 'submitting';
		errorCode = null;

		try {
			const response = await fetch(`${PUBLIC_CONTACT_API_ORIGIN}/v1/inquiries`, {
				method: 'POST',
				headers: { 'content-type': 'application/json' },
				body: JSON.stringify({
					...form,
					locale: contentLocale,
					privacyConsent: form.privacyConsent,
					turnstileToken
				})
			});
			const result = (await response.json()) as InquiryResponse;
			if (!response.ok || !result.ok) {
				submissionState = 'error';
				errorCode = result.ok ? 'delivery_failed' : result.code;
				return;
			}

			submissionState = 'success';
			form = {
				name: '',
				email: '',
				organization: '',
				service: 'marketing-site',
				budget: '25000-49999',
				timeline: '1-2-months',
				summary: '',
				privacyConsent: false
			};
			turnstileToken = '';
			window.turnstile?.reset();
		} catch {
			submissionState = 'error';
			errorCode = 'delivery_failed';
		}
	}
</script>

<svelte:head>
	<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
</svelte:head>

<form class="contact-form" onsubmit={submit}>
	<div class="form-grid two-columns">
		<div class="field">
			<label for="name">{m.form_name()}</label>
			<input id="name" name="name" bind:value={form.name} required maxlength="100" autocomplete="name" />
		</div>
		<div class="field">
			<label for="email">{m.form_email()}</label>
			<input
				id="email"
				name="email"
				type="email"
				bind:value={form.email}
				required
				maxlength="254"
				autocomplete="email"
			/>
		</div>
	</div>

	<div class="field">
		<label for="organization">{m.form_organization()}</label>
		<input
			id="organization"
			name="organization"
			bind:value={form.organization}
			maxlength="120"
			autocomplete="organization"
		/>
	</div>

	<div class="form-grid two-columns">
		<div class="field">
			<label for="service">{m.form_service()}</label>
			<select id="service" name="service" bind:value={form.service} required>
				{#each services as service (service.id)}
					<option value={service.id}>{text(service.title, contentLocale)}</option>
				{/each}
			</select>
		</div>
		<div class="field">
			<label for="budget">{m.form_budget()}</label>
			<select id="budget" name="budget" bind:value={form.budget} required>
				{#each site.budgetOptions as budget (budget.id)}
					<option value={budget.id}>{text(budget.label, contentLocale)}</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="field">
		<label for="timeline">{m.form_timeline()}</label>
		<select id="timeline" name="timeline" bind:value={form.timeline} required>
			{#each site.timelineOptions as timeline (timeline.id)}
				<option value={timeline.id}>{text(timeline.label, contentLocale)}</option>
			{/each}
		</select>
	</div>

	<div class="field">
		<label for="summary">{m.form_summary()}</label>
		<textarea id="summary" name="summary" bind:value={form.summary} minlength="20" maxlength="4000" required
		></textarea>
		<small class="muted">{m.form_summary_hint()}</small>
	</div>

	<div
		class="cf-turnstile"
		data-sitekey={PUBLIC_TURNSTILE_SITE_KEY}
		data-action="inquiry"
		data-theme="auto"
		data-callback="onMengcheTurnstile"
	></div>

	<label class="checkbox-field">
		<input type="checkbox" bind:checked={form.privacyConsent} required />
		<span
			>{m.form_consent()}
			<a class="text-link" href={localizedPath(locale, '/privacy')}>{m.privacy_page_title()}</a></span
		>
	</label>

	<button class="button" type="submit" disabled={submissionState === 'submitting'}>
		{submissionState === 'submitting' ? m.form_submitting() : m.form_submit()}
	</button>

	{#if submissionState === 'success'}
		<p class="form-status" role="status">{m.form_success()}</p>
	{:else if submissionState === 'error'}
		<p class="form-status error" role="alert">{errorMessage(errorCode)}</p>
	{/if}
</form>
