export const serviceIds = ['marketing-site', 'portfolio-business-site', 'full-stack-application'] as const;
export const budgetIds = [
	'under-25000',
	'25000-49999',
	'50000-99999',
	'100000-199999',
	'200000-plus',
	'unsure'
] as const;
export const timelineIds = [
	'within-1-month',
	'1-2-months',
	'2-3-months',
	'over-3-months',
	'flexible'
] as const;

export type InquiryRequest = {
	name: string;
	email: string;
	organization?: string;
	service: (typeof serviceIds)[number];
	budget: (typeof budgetIds)[number];
	timeline: (typeof timelineIds)[number];
	summary: string;
	locale: 'en' | 'zh-TW';
	privacyConsent: true;
	turnstileToken: string;
};

export type InquiryErrorCode = 'invalid_request' | 'verification_failed' | 'rate_limited' | 'delivery_failed';
export type InquiryResponse = { ok: true } | { ok: false; code: InquiryErrorCode };

export type ValidationResult = { ok: true; value: InquiryRequest } | { ok: false; fields: readonly string[] };

const isString = (value: unknown): value is string => typeof value === 'string';
const isOneOf = <T extends readonly string[]>(value: unknown, values: T): value is T[number] =>
	isString(value) && values.includes(value as T[number]);
const clean = (value: string) => value.trim();

export function validateInquiry(input: unknown): ValidationResult {
	if (!input || typeof input !== 'object' || Array.isArray(input)) return { ok: false, fields: ['request'] };

	const record = input as Record<string, unknown>;
	const fields: string[] = [];
	const name = isString(record.name) ? clean(record.name) : '';
	const email = isString(record.email) ? clean(record.email).toLowerCase() : '';
	const organization = isString(record.organization) ? clean(record.organization) : undefined;
	const summary = isString(record.summary) ? clean(record.summary) : '';
	const turnstileToken = isString(record.turnstileToken) ? clean(record.turnstileToken) : '';

	if (name.length < 1 || name.length > 100) fields.push('name');
	if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.push('email');
	if (organization && organization.length > 120) fields.push('organization');
	if (!isOneOf(record.service, serviceIds)) fields.push('service');
	if (!isOneOf(record.budget, budgetIds)) fields.push('budget');
	if (!isOneOf(record.timeline, timelineIds)) fields.push('timeline');
	if (summary.length < 20 || summary.length > 4000) fields.push('summary');
	if (record.locale !== 'en' && record.locale !== 'zh-TW') fields.push('locale');
	if (record.privacyConsent !== true) fields.push('privacyConsent');
	if (turnstileToken.length < 1 || turnstileToken.length > 2048) fields.push('turnstileToken');

	if (fields.length > 0) return { ok: false, fields };

	return {
		ok: true,
		value: {
			name,
			email,
			organization: organization || undefined,
			service: record.service as InquiryRequest['service'],
			budget: record.budget as InquiryRequest['budget'],
			timeline: record.timeline as InquiryRequest['timeline'],
			summary,
			locale: record.locale as InquiryRequest['locale'],
			privacyConsent: true,
			turnstileToken
		}
	};
}
