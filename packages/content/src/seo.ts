import type { ImageRecord, Locale, LocalizedText, ProjectSlug } from './types';

export type SeoPageId = 'home' | 'services' | 'projects' | 'about' | 'contact' | 'privacy';

type LocalizedBannerFiles = Record<Locale, string | null>;

export const seo = {
  socialImageOrigin: 'https://cdn.mengche.dev/og',
  socialImageWidth: 1200,
  socialImageHeight: 630,
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
  socialImageWidth: number;
  socialImageHeight: number;
  socialImageFiles: {
    root: string | null;
    pages: Record<SeoPageId, LocalizedBannerFiles>;
    projects: Record<ProjectSlug, LocalizedBannerFiles>;
  };
};

const pageAlt: Record<SeoPageId, LocalizedText> = {
  home: { en: 'Jay Hsieh web development for Taiwan small businesses', 'zh-TW': '謝孟哲為台灣個人與小型企業提供網站開發' },
  services: { en: 'Jay Hsieh web development services', 'zh-TW': '謝孟哲網站開發服務' },
  projects: { en: 'Jay Hsieh web development projects and case studies', 'zh-TW': '謝孟哲網站開發專案與案例研究' },
  about: { en: 'About Jay Hsieh, Taiwan full-stack developer', 'zh-TW': '關於台灣全端開發者謝孟哲' },
  contact: { en: 'Start a web development project with Jay Hsieh', 'zh-TW': '與謝孟哲開始網站開發專案' },
  privacy: { en: 'MengChe Dev privacy policy', 'zh-TW': 'MengChe Dev 隱私權政策' }
};

const projectAlt: Record<ProjectSlug, LocalizedText> = {
  'butter-personal-website': { en: 'Butter personal website case study', 'zh-TW': 'Butter 個人網站案例研究' },
  'nrg-commerce': { en: 'NRG Commerce full-stack application case study', 'zh-TW': 'NRG Commerce 全端應用程式案例研究' },
  evosnake: { en: 'EvoSnake browser game case study', 'zh-TW': 'EvoSnake 瀏覽器遊戲案例研究' }
};

function resolveSocialImage(file: string | null, alt: LocalizedText): ImageRecord | undefined {
  if (!file) return undefined;
  return {
    url: file.startsWith('https://') ? file : `${seo.socialImageOrigin}/${file.replace(/^\/+/, '')}`,
    width: seo.socialImageWidth,
    height: seo.socialImageHeight,
    mimeType: 'image/webp',
    alt
  };
}

export function rootSocialImage(): ImageRecord | undefined {
  return resolveSocialImage(seo.socialImageFiles.root, pageAlt.home);
}

export function pageSocialImage(page: SeoPageId, locale: Locale): ImageRecord | undefined {
  return resolveSocialImage(seo.socialImageFiles.pages[page][locale], pageAlt[page]);
}

export function projectSocialImage(project: ProjectSlug, locale: Locale): ImageRecord | undefined {
  return resolveSocialImage(seo.socialImageFiles.projects[project][locale], projectAlt[project]);
}
