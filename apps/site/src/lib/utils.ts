import type { Locale, UrlLocale } from '@mengche/content';

export function localizedPath(locale: UrlLocale, path = ''): string {
	return `/${locale}${path}`;
}

export function alternateLocale(locale: UrlLocale): UrlLocale {
	return locale === 'en' ? 'zh-tw' : 'en';
}

export function switchLocalePath(pathname: string, locale: UrlLocale): string {
	const segments = pathname.split('/').filter(Boolean);
	if (segments[0] === 'en' || segments[0] === 'zh-tw') segments[0] = locale;
	else segments.unshift(locale);
	return `/${segments.join('/')}`;
}

export function formatTwd(amount: number, locale: Locale): string {
	return new Intl.NumberFormat(locale === 'zh-TW' ? 'zh-TW' : 'en-US', {
		style: 'currency',
		currency: 'TWD',
		maximumFractionDigits: 0
	}).format(amount);
}

export function formatUsd(amount: number): string {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD',
		currencyDisplay: 'code',
		maximumFractionDigits: 0
	}).format(amount);
}
