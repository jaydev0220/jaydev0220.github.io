import type { Project } from './types';

export const projects: readonly Project[] = [
  {
    slug: 'butter-personal-website',
    title: "Butter's Personal Website",
    category: { en: 'Individual website', 'zh-TW': '個人網站' },
    summary: {
      en: 'A static personal site with a clear identity, responsive reading flow, and maintainable Svelte structure.',
      'zh-TW': '以清楚個人形象、響應式閱讀流程與可維護 Svelte 架構為核心的靜態個人網站。'
    },
    relationship: 'collaborative',
    featured: true,
    order: 1,
    technologies: ['Svelte', 'TypeScript', 'Tailwind CSS', 'Static deployment'],
    images: [
      'https://cdn.mengche.dev/projects/butter-1.webp',
      'https://cdn.mengche.dev/projects/butter-2.webp',
      'https://cdn.mengche.dev/projects/butter-3.webp'
    ],
    actions: [
      { label: 'repository', url: 'https://github.com/eddyb5201314-afk/eddyb5201314-afk.github.io' },
      { label: 'live-preview', url: 'https://eddyb5201314-afk.github.io' }
    ]
  },
  {
    slug: 'nrg-commerce',
    title: 'NRG Commerce',
    category: { en: 'Business application', 'zh-TW': '商業應用程式' },
    summary: {
      en: 'A commerce platform using a full-stack monorepo for the public site, catalog, admin, API, contact service, database, and shared code.',
      'zh-TW': '以全端 monorepo 組織公開網站、商品目錄、後台、API、聯絡服務、資料庫與共用系統的電商平台。'
    },
    relationship: 'independent',
    featured: true,
    order: 2,
    technologies: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'pnpm workspace', 'Cloudflare'],
    images: ['https://cdn.mengche.dev/projects/nrg-1.webp'],
    actions: [
      { label: 'repository', url: 'https://github.com/jaydev0220/nrg-commerce' },
      { label: 'live-preview', url: 'https://www.nrglabware.com/' }
    ]
  },
  {
    slug: 'evosnake',
    title: 'EvoSnake',
    category: { en: 'Entertainment project', 'zh-TW': '娛樂專案' },
    summary: {
      en: 'A browser game exploring interaction design, changing rules, responsive game state, and creative frontend work.',
      'zh-TW': '探索互動設計、動態規則、響應式遊戲狀態與創意前端工程的瀏覽器遊戲。'
    },
    relationship: 'independent',
    featured: true,
    order: 3,
    technologies: ['Vue', 'TypeScript', 'Tailwind CSS', 'Responsive design'],
    images: [
      'https://cdn.mengche.dev/projects/snake-1.webp',
      'https://cdn.mengche.dev/projects/snake-2.webp',
      'https://cdn.mengche.dev/projects/snake-3.webp'
    ],
    actions: [
      { label: 'repository', url: 'https://github.com/jaydev0220/evo-snake' },
      { label: 'live-preview', url: 'https://snake.mengche.dev' }
    ]
  }
] as const;

export const featuredProjects = projects.filter((project) => project.featured);
export const archiveProjects = projects.filter((project) => !project.featured);
export const projectBySlug = Object.fromEntries(projects.map((project) => [project.slug, project])) as Record<
  Project['slug'],
  Project
>;
