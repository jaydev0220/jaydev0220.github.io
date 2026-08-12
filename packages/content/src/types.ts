export const locales = ['en', 'zh-TW'] as const;
export type Locale = (typeof locales)[number];
export type UrlLocale = 'en' | 'zh-tw';
export type LocalizedText = Record<Locale, string>;

export type DatedContent = {
  publishedAt: string;
  updatedAt?: string;
};

export type ServiceId = 'marketing-site' | 'portfolio-business-site' | 'full-stack-application';
export type ProjectSlug = 'butter-personal-website' | 'nrg-commerce' | 'evosnake';
export type CommercialPageId = 'home' | 'services' | 'projects' | 'about';

export type CommercialSection = {
  id: string;
  heading: LocalizedText;
  paragraphs: readonly LocalizedText[];
  bullets?: readonly LocalizedText[];
};

export type CommercialPage = {
  publishedAt: string;
  updatedAt?: string;
  title: LocalizedText;
  heading: LocalizedText;
  description: LocalizedText;
  sections: readonly CommercialSection[];
};

export type ServiceProjectRelationship = {
  serviceId: ServiceId;
  projectSlugs: readonly ProjectSlug[];
};

export type ProjectAction = {
  label: 'repository' | 'live-preview';
  url: string;
};

export type ImageRecord = {
  url: string;
  width: number;
  height: number;
  alt: LocalizedText;
  mimeType: 'image/webp';
};

export type ProjectSubjectType = 'WebSite' | 'WebApplication' | 'VideoGame';

export type Project = {
  slug: ProjectSlug;
  title: string;
  category: LocalizedText;
  summary: LocalizedText;
  seoTitle: LocalizedText;
  seoDescription: LocalizedText;
  relationship: 'collaborative' | 'independent';
  featured: boolean;
  order: number;
  technologies: readonly string[];
  publishedAt: string;
  updatedAt?: string;
  subjectType: ProjectSubjectType;
  images: readonly ImageRecord[];
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
export const preferredContentDate = (content: DatedContent): string =>
  content.updatedAt ?? content.publishedAt;
