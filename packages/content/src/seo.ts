import type { Locale, ProjectSlug } from './types';

export type SeoPageId = 'home' | 'services' | 'projects' | 'about' | 'contact' | 'privacy';

type LocalizedBannerFiles = Record<Locale, string | null>;

export const seo = {
  socialImageOrigin: 'https://cdn.mengche.dev/og',
  socialImageFiles: {
    root: '/en/home.webp',
    pages: {
      home: { en: '/en/home.webp', 'zh-TW': '/zh-tw/home.webp' },
      services: { en: '/en/services.webp', 'zh-TW': '/zh-tw/services.webp' },
      projects: { en: '/en/projects.webp', 'zh-TW': '/zh-tw/projects.webp' },
      about: { en: '/en/about.webp', 'zh-TW': '/zh-tw/about.webp' },
      contact: { en: '/en/contact.webp', 'zh-TW': '/zh-tw/contact.webp' },
      privacy: { en: '/en/privacy.webp', 'zh-TW': '/zh-tw/privacy.webp' }
    },
    projects: {
      'butter-personal-website': { en: '/en/butter.webp', 'zh-TW': '/zh-tw/butter.webp' },
      'nrg-commerce': { en: '/en/nrg.webp', 'zh-TW': '/zh-tw/nrg.webp' },
      evosnake: { en: '/en/snake.webp', 'zh-TW': '/zh-tw/snake.webp' }
    }
  }
} as const satisfies {
  socialImageOrigin: string;
  socialImageFiles: {
    root: string | null;
    pages: Record<SeoPageId, LocalizedBannerFiles>;
    projects: Record<ProjectSlug, LocalizedBannerFiles>;
  };
};

function resolveSocialImage(file: string | null): string | undefined {
  if (!file) return undefined;
  if (file.startsWith('https://')) return file;
  return `${seo.socialImageOrigin}/${file.replace(/^\/+/, '')}`;
}

export function rootSocialImage(): string | undefined {
  return resolveSocialImage(seo.socialImageFiles.root);
}

export function pageSocialImage(page: SeoPageId, locale: Locale): string | undefined {
  return resolveSocialImage(seo.socialImageFiles.pages[page][locale]);
}

export function projectSocialImage(project: ProjectSlug, locale: Locale): string | undefined {
  return resolveSocialImage(seo.socialImageFiles.projects[project][locale]);
}
