export interface SocialLink {
	name: string;
	url: string;
	icon: string;
}

export interface Education {
	degree?: string;
	institution: string;
	period: string;
	location: string;
	description?: string;
}

export interface Skill {
	name: string;
	icon: string;
}

export interface SkillCategory {
	category: string;
	skills: Skill[];
}

export interface NavigationLink {
	id: string;
	label: string;
	href: string;
}

export type ProjectType = 'web' | 'mobile' | 'data' | 'automation' | 'all';

export interface Project {
	id: string;
	title: string;
	description: string;
	type: ProjectType[];
	technologies: string[];
	githubUrl?: string;
	liveUrl?: string;
}

export interface ResumeData {
	name: string;
	title: string;
	location: string;
	email: string;
	about: string;
}

export const resume: ResumeData = {
	name: 'Meng Che Hsieh',
	title: '全端工程師',
	location: '台灣・台北',
	email: 'mengche@example.com',
	about: '專注在產品體驗與系統可維護性的全端工程師。'
};

export const socialLinks: SocialLink[] = [
	{
		name: 'GitHub',
		url: 'https://github.com/mengche',
		icon: 'github'
	},
	{
		name: 'LinkedIn',
		url: 'https://linkedin.com/in/mengche',
		icon: 'linkedin'
	},
	{
		name: 'X',
		url: 'https://x.com/mengche',
		icon: 'x'
	},
	{
		name: 'Email',
		url: 'mailto:mengche@example.com',
		icon: 'mail'
	}
];

export const education: Education[] = [
	{
		degree: '資訊工程碩士',
		institution: '國立台灣大學',
		period: '2019 - 2021',
		location: '台北市',
		description: '研究主題為分散式系統與資料處理流程設計。'
	},
	{
		degree: '資訊管理學士',
		institution: '國立政治大學',
		period: '2015 - 2019',
		location: '台北市',
		description: '專注於軟體工程、資料庫與產品開發實務。'
	}
];

export const skillCategories: SkillCategory[] = [
	{
		category: '前端開發',
		skills: [
			{ name: 'Svelte', icon: 'terminal' },
			{ name: 'React', icon: 'component' },
			{ name: 'TypeScript', icon: 'typed' },
			{ name: 'Tailwind CSS', icon: 'style' },
			{ name: 'Vite', icon: 'bolt' },
			{ name: 'Playwright', icon: 'test' }
		]
	},
	{
		category: '後端與 API',
		skills: [
			{ name: 'Node.js', icon: 'runtime' },
			{ name: 'Python', icon: 'script' },
			{ name: 'Go', icon: 'service' },
			{ name: 'FastAPI', icon: 'api' },
			{ name: 'GraphQL', icon: 'graph' },
			{ name: 'REST', icon: 'network' }
		]
	},
	{
		category: '資料與平台',
		skills: [
			{ name: 'PostgreSQL', icon: 'database' },
			{ name: 'Redis', icon: 'cache' },
			{ name: 'MongoDB', icon: 'document' },
			{ name: 'Docker', icon: 'container' },
			{ name: 'GitHub Actions', icon: 'pipeline' },
			{ name: 'Kubernetes', icon: 'cluster' }
		]
	}
];

export const projects: Project[] = [
	{
		id: 'ecommerce-platform',
		title: '電商營運平台',
		description: '整合商品、庫存與金流流程，提供完整後台與訂單追蹤能力。',
		type: ['web'],
		technologies: ['SvelteKit', 'TypeScript', 'PostgreSQL', 'Stripe'],
		githubUrl: 'https://github.com/mengche/ecommerce-platform',
		liveUrl: 'https://ecommerce-demo.example.com'
	},
	{
		id: 'task-manager-mobile',
		title: '跨平台任務管理 App',
		description: '支援離線編輯與同步，並可依團隊流程自訂任務欄位與提醒規則。',
		type: ['mobile'],
		technologies: ['React Native', 'TypeScript', 'Firebase'],
		githubUrl: 'https://github.com/mengche/task-manager-mobile'
	},
	{
		id: 'data-visualization-dashboard',
		title: '即時數據視覺化儀表板',
		description: '提供可組態的圖表模組與即時串流資料展示，支援多角色檢視。',
		type: ['web', 'data'],
		technologies: ['React', 'D3.js', 'FastAPI', 'WebSocket'],
		githubUrl: 'https://github.com/mengche/data-viz-dashboard',
		liveUrl: 'https://dataviz-demo.example.com'
	},
	{
		id: 'ai-content-generator',
		title: 'AI 內容生成工具',
		description: '以提示模板與任務流程引擎提升內容產製效率，並提供審核機制。',
		type: ['web', 'automation'],
		technologies: ['Svelte', 'Python', 'OpenAI API', 'PostgreSQL'],
		githubUrl: 'https://github.com/mengche/ai-content-gen',
		liveUrl: 'https://ai-content.example.com'
	},
	{
		id: 'devops-automation-suite',
		title: 'DevOps 自動化工具箱',
		description: '集中管理部署、監控與告警流程，降低維運重複工作成本。',
		type: ['automation'],
		technologies: ['Go', 'Docker', 'Kubernetes', 'GitHub Actions'],
		githubUrl: 'https://github.com/mengche/devops-suite'
	},
	{
		id: 'social-media-analytics',
		title: '社群數據分析平台',
		description: '整合多來源社群資料，提供情緒分析、成長追蹤與異常提醒。',
		type: ['web', 'data'],
		technologies: ['Vue.js', 'Python', 'MongoDB', 'TensorFlow'],
		githubUrl: 'https://github.com/mengche/social-analytics',
		liveUrl: 'https://social-analytics.example.com'
	},
	{
		id: 'fitness-tracker-app',
		title: '健康追蹤 App',
		description: '記錄訓練、睡眠與身體指標，並提供個人化訓練建議。',
		type: ['mobile'],
		technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
		githubUrl: 'https://github.com/mengche/fitness-tracker'
	},
	{
		id: 'real-time-chat-platform',
		title: '即時協作聊天平台',
		description: '提供頻道、私訊與檔案共享，支援高併發即時訊息傳輸。',
		type: ['web'],
		technologies: ['React', 'Node.js', 'Socket.io', 'Redis'],
		githubUrl: 'https://github.com/mengche/chat-platform',
		liveUrl: 'https://chat-demo.example.com'
	},
	{
		id: 'inventory-management-system',
		title: '庫存管理系統',
		description: '支援多倉庫管理、補貨策略與條碼流程，提升供應鏈透明度。',
		type: ['web', 'automation'],
		technologies: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL'],
		githubUrl: 'https://github.com/mengche/inventory-system'
	}
];

export const navLinks: NavigationLink[] = [
	{ id: 'about', label: '關於', href: '#about' },
	{ id: 'tech-stack', label: '技術棧', href: '#tech-stack' },
	{ id: 'portfolio', label: '作品', href: '#portfolio' },
	{ id: 'contact', label: '聯絡', href: '#contact' }
];

export const typingStrings = ['你好，我是 Meng Che Hsieh。', '我是一名前端偏向的全端工程師。'];

export const projectFilters: { label: string; type: ProjectType }[] = [
	{ label: '全部', type: 'all' },
	{ label: '網站應用', type: 'web' },
	{ label: '行動應用', type: 'mobile' },
	{ label: '資料分析', type: 'data' },
	{ label: '自動化', type: 'automation' }
];
