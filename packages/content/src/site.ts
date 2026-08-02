import type { LocalizedText, ServiceId } from './types';

export const site = {
  brand: 'MengChe Dev',
  canonicalOrigin: 'https://www.mengche.dev',
  contactOrigin: 'https://contact.mengche.dev',
  email: 'contact@mengche.dev',
  location: { en: 'Taiwan', 'zh-TW': '台灣' } satisfies LocalizedText,
  availability: {
    status: 'accepting-projects',
    label: { en: 'Accepting commissions', 'zh-TW': '接受專案委託' } satisfies LocalizedText,
    concurrentBuilds: 1,
    responseBusinessDays: 2
  },
  hero: {
    eyebrow: { en: 'Web development', 'zh-TW': '網站開發' } satisfies LocalizedText,
    title: {
      en: 'Websites built to work',
      'zh-TW': '打造真正好用的網站'
    } satisfies LocalizedText,
    summary: {
      en: 'I build maintainable websites and web apps for individuals and small businesses in Taiwan, with English support for overseas clients.',
      'zh-TW': '我為台灣的個人與小型企業開發可維護的網站與 Web 應用程式，也以英文支援海外客戶。'
    } satisfies LocalizedText
  },
  process: [
    {
      id: 'discovery',
      title: { en: 'Discovery and scope', 'zh-TW': '需求探索與範圍確認' },
      summary: {
        en: 'Confirm goals, limits, responsibilities, and the proposal.',
        'zh-TW': '確認目標、限制、責任與專案提案。'
      }
    },
    {
      id: 'planning',
      title: { en: 'Planning and content structure', 'zh-TW': '規劃與內容結構' },
      summary: {
        en: 'Organize pages, flows, content, and delivery stages.',
        'zh-TW': '整理頁面、使用流程、內容與交付階段。'
      }
    },
    {
      id: 'development',
      title: { en: 'Development and review', 'zh-TW': '開發與審查' },
      summary: {
        en: 'Build, test, and review each agreed stage.',
        'zh-TW': '依照約定階段進行實作、測試與審查。'
      }
    },
    {
      id: 'launch',
      title: { en: 'Launch and warranty', 'zh-TW': '上線與保固' },
      summary: {
        en: 'Deploy, hand over, and provide a 30-day defect warranty.',
        'zh-TW': '完成部署與交接，並提供 30 天缺陷保固。'
      }
    }
  ] as const,
  commercialTerms: {
    depositPercent: 50,
    finalPercent: 50,
    revisionRoundsPerStage: 2,
    warrantyDays: 30,
    maintenance: {
      en: 'Quoted as needed after warranty',
      'zh-TW': '保固期後依需求報價維護'
    } satisfies LocalizedText
  },
  budgetOptions: [
    { id: 'under-25000', label: { en: 'Under NT$25,000', 'zh-TW': '低於 NT$25,000' } },
    { id: '25000-49999', label: { en: 'NT$25,000–49,999', 'zh-TW': 'NT$25,000–49,999' } },
    { id: '50000-99999', label: { en: 'NT$50,000–99,999', 'zh-TW': 'NT$50,000–99,999' } },
    { id: '100000-199999', label: { en: 'NT$100,000–199,999', 'zh-TW': 'NT$100,000–199,999' } },
    { id: '200000-plus', label: { en: 'NT$200,000+', 'zh-TW': 'NT$200,000 以上' } },
    { id: 'unsure', label: { en: 'Not sure yet', 'zh-TW': '尚未確定' } }
  ] as const,
  timelineOptions: [
    { id: 'within-1-month', label: { en: 'Within 1 month', 'zh-TW': '1 個月內' } },
    { id: '1-2-months', label: { en: '1–2 months', 'zh-TW': '1–2 個月' } },
    { id: '2-3-months', label: { en: '2–3 months', 'zh-TW': '2–3 個月' } },
    { id: 'over-3-months', label: { en: 'More than 3 months', 'zh-TW': '3 個月以上' } },
    { id: 'flexible', label: { en: 'Flexible or undecided', 'zh-TW': '彈性或尚未確定' } }
  ] as const,
  serviceOptions: [
    'marketing-site',
    'portfolio-business-site',
    'full-stack-application'
  ] as readonly ServiceId[]
} as const;

export const profile = {
  name: { en: 'Jay Hsieh', 'zh-TW': '謝孟哲' } satisfies LocalizedText,
  role: { en: 'Full-stack developer', 'zh-TW': '全端開發者' } satisfies LocalizedText,
  biography: {
    en: 'I build full-stack web projects with maintainable structure, clear flows, good performance, and reliable deployment.',
    'zh-TW': '我專注於可維護的架構、清楚的使用流程、效能與可靠部署，持續開發全端 Web 專案。'
  } satisfies LocalizedText,
  education: {
    institution: {
      en: 'National Yunlin University of Science and Technology',
      'zh-TW': '國立雲林科技大學'
    } satisfies LocalizedText,
    period: '2024–present'
  },
  qualifications: [
    {
      id: 'full-stack-open',
      name: 'Full Stack Open',
      issuer: 'University of Helsinki',
      year: 2026,
      credentialUrl: 'https://cdn.mengche.dev/certificates/full-stack-open.webp'
    },
    {
      id: 'toeic-885',
      name: 'TOEIC Gold (885)',
      issuer: 'ETS',
      year: 2023,
      credentialUrl: 'https://cdn.mengche.dev/certificates/toeic-2023.webp'
    }
  ],
  capabilities: [
    { en: 'Frontend and responsive UI', 'zh-TW': '前端工程與響應式介面' },
    { en: 'Backend systems, APIs, and data', 'zh-TW': '後端系統、API 與關聯式資料' },
    { en: 'Planning, content structure, and flows', 'zh-TW': '規劃、內容結構與使用流程' },
    { en: 'Testing, performance, and deployment', 'zh-TW': '測試、效能與部署' }
  ] as readonly LocalizedText[]
} as const;

export const socialLinks = [
  { id: 'github', label: 'GitHub', url: 'https://github.com/jaydev0220' },
  { id: 'linkedin', label: 'LinkedIn', url: 'https://linkedin.com/in/mengche0220' },
  { id: 'facebook', label: 'Facebook', url: 'https://www.facebook.com/jaydev0220/' },
  { id: 'discord', label: 'Discord', url: 'https://discordapp.com/users/263613963034427392' }
] as const;

export const navigation = [
  { id: 'home', href: '', label: { en: 'Home', 'zh-TW': '首頁' } },
  { id: 'services', href: '/services', label: { en: 'Services', 'zh-TW': '服務' } },
  { id: 'projects', href: '/projects', label: { en: 'Projects', 'zh-TW': '專案' } },
  { id: 'about', href: '/about', label: { en: 'About', 'zh-TW': '關於' } },
  { id: 'contact', href: '/contact', label: { en: 'Contact', 'zh-TW': '聯絡' } }
] as const;
