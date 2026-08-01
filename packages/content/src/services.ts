import type { Service } from './types';

const commonExclusions = [
	{ en: 'Brand and logo design', 'zh-TW': '品牌識別與標誌設計' },
	{ en: 'Photography, illustration, and full copywriting', 'zh-TW': '攝影、插畫與完整文案撰寫' }
] as const;

export const services: readonly Service[] = [
	{
		id: 'marketing-site',
		order: 1,
		title: { en: 'Marketing website', 'zh-TW': '行銷網站' },
		summary: {
			en: 'A responsive site with clear information and one main action for promoting a service, event, or product.',
			'zh-TW': '以清楚資訊與單一主要行動為核心的響應式網站，適合推廣服務、活動或產品。'
		},
		idealFor: {
			en: 'Events, product launches, local services, and focused campaigns',
			'zh-TW': '活動、產品發布、在地服務與單一主題推廣'
		},
		startingPriceTwd: 15000,
		approximatePriceUsd: 470,
		deliveryRange: { minimumWeeks: 3, maximumWeeks: 5 },
		deliverables: [
			{ en: 'Planning and content structure', 'zh-TW': '規劃與內容結構' },
			{ en: 'Responsive development', 'zh-TW': '響應式開發' },
			{ en: 'Performance and deployment', 'zh-TW': '效能與部署' }
		],
		exclusions: commonExclusions
	},
	{
		id: 'portfolio-business-site',
		order: 2,
		title: { en: 'Portfolio or business site', 'zh-TW': '作品集或企業網站' },
		summary: {
			en: 'A maintainable multi-page site for services, work, business information, and contact.',
			'zh-TW': '將服務、作品、企業資訊與聯絡流程整理成可長期維護的多頁網站。'
		},
		idealFor: {
			en: 'Creators, professionals, small businesses, and teams',
			'zh-TW': '創作者、專業工作者、小型企業與團隊'
		},
		startingPriceTwd: 30000,
		approximatePriceUsd: 940,
		deliveryRange: { minimumWeeks: 5, maximumWeeks: 8 },
		deliverables: [
			{ en: 'Information structure and page planning', 'zh-TW': '資訊架構與頁面規劃' },
			{ en: 'Reusable content and UI system', 'zh-TW': '可重用的內容與介面系統' },
			{ en: 'SEO, analytics, performance, and deployment', 'zh-TW': 'SEO、分析、效能與部署' }
		],
		exclusions: commonExclusions
	},
	{
		id: 'full-stack-application',
		order: 3,
		title: { en: 'Small full-stack app', 'zh-TW': '小型全端應用程式' },
		summary: {
			en: 'An app with custom flows, data, authentication, integrations, or admin tools.',
			'zh-TW': '具備自訂流程、資料、驗證、整合或管理工具的應用程式。'
		},
		idealFor: {
			en: 'Internal tools, MVPs, portals, and business workflows',
			'zh-TW': '內部工具、MVP、入口網站與營運流程'
		},
		startingPriceTwd: 80000,
		approximatePriceUsd: 2500,
		deliveryRange: { minimumWeeks: 8 },
		deliverables: [
			{ en: 'Technical scope and data flow', 'zh-TW': '技術範圍與資料流程規劃' },
			{ en: 'Frontend, backend, and integrations', 'zh-TW': '前端、後端與整合開發' },
			{ en: 'Testing, deployment, and handoff', 'zh-TW': '測試、部署與營運交接' }
		],
		exclusions: commonExclusions
	}
] as const;

export const serviceById = Object.fromEntries(services.map((service) => [service.id, service])) as Record<
	Service['id'],
	Service
>;
