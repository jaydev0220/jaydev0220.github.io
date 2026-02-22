export interface SocialLink {
	name: string;
	url: string;
	icon: string;
}

export interface Education {
	degree?: string;
	institution: string;
	location: string;
	period: string;
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

export interface Certificate {
	name: string;
	issuer: string;
	date: string;
	credentialUrl?: string;
}

export type ProjectType = 'all';

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
	about: string[];
}

export const resume: ResumeData = {
	name: '謝孟哲',
	title: '全端工程師',
	location: '台灣・新竹',
	email: 'contact@hsieh-dev.us.ci',
	about: [
		'我是 謝孟哲，你可以叫我 阿哲 或 Jay！',
		'我是一名對開發充滿熱情的學生，有 4 年全端開發經驗，熟悉 Node.js、Svelte 與 TypeScript。',
		'目前持續精進中，也歡迎任何交流與合作機會！'
	]
};

export const socialLinks: SocialLink[] = [
	{
		name: 'Facebook',
		url: 'https://www.facebook.com/jayxie9499/',
		icon: 'facebook'
	},
	{
		name: 'Discord',
		url: 'https://discordapp.com/users/263613963034427392',
		icon: 'discord'
	},
	{
		name: 'GitHub',
		url: 'https://github.com/JayXie9499',
		icon: 'github'
	},
	{
		name: 'LinkedIn',
		url: 'https://linkedin.com/in/mengche0220',
		icon: 'linkedin'
	}
];

export const education: Education[] = [
	{
		institution: '國立雲林科技大學',
		location: '雲林縣斗六市大學路三段123號',
		period: '2024 - NOW'
	},
	{
		institution: '國立新竹高級工業職業學校',
		location: '新竹市東區中華路二段2號',
		period: '2021 - 2024'
	},
	{
		institution: '新竹市立光華國民中學',
		location: '新竹市北區光華北街10號',
		period: '2018 - 2021'
	},
	{
		institution: '新竹市北區北門國民小學',
		location: '新竹市北區水田街33號',
		period: '2012 - 2018'
	}
];

export const skillCategories: SkillCategory[] = [
	{
		category: '前端開發',
		skills: [
			{ name: 'HTML', icon: 'html5' },
			{ name: 'CSS', icon: 'css' },
			{ name: 'JavaScript', icon: 'javascript' },
			{ name: 'TypeScript', icon: 'typescript' },
			{ name: 'Svelte', icon: 'svelte' },
			{ name: 'Tailwind CSS', icon: 'tailwindcss' },
			{ name: 'Flutter', icon: 'flutter' }
		]
	},
	{
		category: '後端開發',
		skills: [
			{ name: 'Node.js', icon: 'nodedotjs' },
			{ name: 'Python', icon: 'python' },
			{ name: 'Express', icon: 'express' },
			{ name: 'FastAPI', icon: 'fastapi' },
			{ name: 'REST', icon: 'rest' },
			{ name: 'GraphQL', icon: 'graphql' }
		]
	},
	{
		category: '資料管理',
		skills: [
			{ name: 'PostgreSQL', icon: 'postgresql' },
			{ name: 'Redis', icon: 'redis' },
			{ name: 'MongoDB', icon: 'mongodb' },
			{ name: 'SQLite', icon: 'sqlite' }
		]
	},
	{
		category: '網路與伺服器',
		skills: [
			{ name: 'Docker', icon: 'docker' },
			{ name: 'GitHub Actions', icon: 'githubactions' },
			{ name: 'AWS', icon: 'aws' },
			{ name: 'GCP', icon: 'googlecloud' },
			{ name: 'Railway', icon: 'railway' },
			{ name: 'Cloudflare', icon: 'cloudflare' }
		]
	}
];

export const projects: Project[] = [
	{
		id: '1',
		title: 'Daily Quote Generator',
		description:
			'A simple web app that displays a random daily quote, built with HTML, CSS, and JavaScript.',
		type: [],
		technologies: ['HTML', 'CSS', 'JavaScript'],
		githubUrl: 'https://github.com/JayXie9499/daily-quote-generator',
		liveUrl: '/daily-quote-generator'
	},
	{
		id: '2',
		title: 'Password Strength Checker',
		description:
			'A password strength checker that evaluates passwords based on length, character diversity, and common patterns, providing feedback and suggestions.',
		type: [],
		technologies: ['Python'],
		githubUrl: 'https://github.com/JayXie9499/password-strength-checker',
		liveUrl: '/password-strength-checker'
	}
];

export const certificates: Certificate[] = [
	{
		name: 'TOEIC Gold (885)',
		issuer: '',
		date: '',
		credentialUrl: 'https://cdn.hsieh-dev.us.ci/certificates/'
	},
	{
		name: '工業電子丙級',
		issuer: '',
		date: '2023',
		credentialUrl: 'https://cdn.hsieh-dev.us.ci/certificates/industrial-electronics-c.webp'
	},
	{
		name: '工業配線丙級',
		issuer: '',
		date: '2022',
		credentialUrl: 'https://cdn.hsieh-dev.us.ci/certificates/industrial-wiring-c.webp'
	},
	{
		name: 'GEPT 中級',
		issuer: '',
		date: '',
		credentialUrl: 'https://cdn.hsieh-dev.us.ci/certificates/'
	},
	{
		name: 'GEPT 初級',
		issuer: '',
		date: '',
		credentialUrl: 'https://cdn.hsieh-dev.us.ci/certificates/'
	}
];

export const navLinks: NavigationLink[] = [
	{ id: 'about', label: '關於', href: '#about' },
	{ id: 'certificates', label: '證照', href: '#certificates' },
	{ id: 'skills', label: '技能', href: '#skills' },
	{ id: 'portfolio', label: '作品', href: '#portfolio' }
];

export const typingStrings = ['你好，我是謝孟哲。', '我是一名全端工程師。'];

export const projectFilters: { label: string; type: ProjectType }[] = [
	{ label: '全部', type: 'all' }
];
