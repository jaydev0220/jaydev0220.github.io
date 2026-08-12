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
    seoTitle: {
      en: 'Butter Personal Website Case Study | Jay Hsieh',
      'zh-TW': 'Butter 個人網站案例研究｜謝孟哲'
    },
    seoDescription: {
      en: "See how Butter's responsive personal website organizes identity, teaching results, and music content with maintainable Svelte components.",
      'zh-TW': '了解 Butter 響應式個人網站如何以可維護的 Svelte 元件整理個人形象、教學成果與音樂內容。'
    },
    relationship: 'collaborative',
    featured: true,
    order: 1,
    technologies: ['Svelte', 'TypeScript', 'Tailwind CSS', 'Static deployment'],
    publishedAt: '2026-08-01',
    subjectType: 'WebSite',
    images: [
      {
        url: 'https://cdn.mengche.dev/projects/butter-1.webp',
        width: 1280,
        height: 720,
        mimeType: 'image/webp',
        alt: {
          en: 'Butter personal website hero introducing the site owner',
          'zh-TW': 'Butter 個人網站介紹站主的首頁主視覺'
        }
      },
      {
        url: 'https://cdn.mengche.dev/projects/butter-2.webp',
        width: 1280,
        height: 720,
        mimeType: 'image/webp',
        alt: { en: 'Butter website teaching-results carousel', 'zh-TW': 'Butter 網站的教學成果輪播區' }
      },
      {
        url: 'https://cdn.mengche.dev/projects/butter-3.webp',
        width: 1280,
        height: 720,
        mimeType: 'image/webp',
        alt: { en: 'Butter website music section', 'zh-TW': 'Butter 網站的音樂作品區' }
      }
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
    seoTitle: {
      en: 'NRG Commerce Web Application Case Study | Jay Hsieh',
      'zh-TW': 'NRG Commerce 全端 Web 應用程式案例研究｜謝孟哲'
    },
    seoDescription: {
      en: 'Explore the NRG Commerce full-stack monorepo, including its storefront, catalog, admin, API, database, shared contracts, testing, and deployment.',
      'zh-TW': '了解 NRG Commerce 全端 monorepo 的商店、目錄、後台、API、資料庫、共用契約、測試與部署架構。'
    },
    relationship: 'independent',
    featured: true,
    order: 2,
    technologies: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'pnpm workspace', 'Cloudflare'],
    publishedAt: '2026-08-01',
    subjectType: 'WebApplication',
    images: [
      {
        url: 'https://cdn.mengche.dev/projects/nrg-1.webp',
        width: 1280,
        height: 720,
        mimeType: 'image/webp',
        alt: {
          en: 'NRG Commerce laboratory-glass storefront with product categories',
          'zh-TW': 'NRG Commerce 實驗室玻璃器材商店首頁與商品分類'
        }
      }
    ],
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
    seoTitle: {
      en: 'EvoSnake Browser Game Case Study | Jay Hsieh',
      'zh-TW': 'EvoSnake 瀏覽器遊戲案例研究｜謝孟哲'
    },
    seoDescription: {
      en: 'Review EvoSnake game-state modeling, responsive controls, instructions, events, feedback, and leaderboard flow in a public Vue browser game.',
      'zh-TW': '查看 EvoSnake 公開 Vue 瀏覽器遊戲的狀態建模、響應式控制、說明、事件、回饋與排行榜流程。'
    },
    relationship: 'independent',
    featured: true,
    order: 3,
    technologies: ['Vue', 'TypeScript', 'Tailwind CSS', 'Responsive design'],
    publishedAt: '2026-08-01',
    subjectType: 'VideoGame',
    images: [
      {
        url: 'https://cdn.mengche.dev/projects/snake-1.webp',
        width: 1280,
        height: 720,
        mimeType: 'image/webp',
        alt: { en: 'EvoSnake setup and leaderboard screen', 'zh-TW': 'EvoSnake 設定與排行榜畫面' }
      },
      {
        url: 'https://cdn.mengche.dev/projects/snake-2.webp',
        width: 1280,
        height: 720,
        mimeType: 'image/webp',
        alt: { en: 'EvoSnake instructions dialog', 'zh-TW': 'EvoSnake 遊戲說明對話框' }
      },
      {
        url: 'https://cdn.mengche.dev/projects/snake-3.webp',
        width: 1280,
        height: 720,
        mimeType: 'image/webp',
        alt: {
          en: 'EvoSnake active game board with controls and score',
          'zh-TW': 'EvoSnake 進行中的遊戲版面、控制與分數'
        }
      }
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
