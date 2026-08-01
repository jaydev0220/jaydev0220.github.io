export const locales = ['en', 'zh-TW'] as const;
export type Locale = (typeof locales)[number];
export type UrlLocale = 'en' | 'zh-tw';
export type LocalizedText = Record<Locale, string>;

export type ServiceId = 'marketing-site' | 'portfolio-business-site' | 'full-stack-application';
export type ProjectSlug = 'butter-personal-website' | 'nrg-commerce' | 'evosnake';

export type ProjectAction = {
	label: 'repository' | 'live-preview';
	url: string;
};

export type Project = {
	slug: ProjectSlug;
	title: string;
	category: LocalizedText;
	summary: LocalizedText;
	relationship: 'collaborative' | 'independent';
	featured: boolean;
	order: number;
	technologies: readonly string[];
	images: readonly string[];
	actions: readonly ProjectAction[];
};

export type Service = {
	id: ServiceId;
	order: number;
	title: LocalizedText;
	summary: LocalizedText;
	idealFor: LocalizedText;
	startingPriceTwd: number;
	approximatePriceUsd: number;
	deliveryRange: { minimumWeeks: number; maximumWeeks?: number };
	deliverables: readonly LocalizedText[];
	exclusions: readonly LocalizedText[];
};

export const localeFromUrl = (locale: UrlLocale): Locale => (locale === 'zh-tw' ? 'zh-TW' : 'en');
export const urlLocaleFromLocale = (locale: Locale): UrlLocale => (locale === 'zh-TW' ? 'zh-tw' : 'en');
export const text = (value: LocalizedText, locale: Locale): string => value[locale];
