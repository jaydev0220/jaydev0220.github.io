import type { SkillCategory } from './types';

export const skillCategories: SkillCategory[] = [
	{
		category: '前端開發',
		skills: [
			{ name: 'HTML', icon: 'skill-icons:html' },
			{ name: 'CSS', icon: 'skill-icons:css' },
			{ name: 'JavaScript', icon: 'skill-icons:javascript' },
			{ name: 'TypeScript', icon: 'skill-icons:typescript' },
			{ name: 'Svelte', icon: 'skill-icons:svelte' },
			{ name: 'Vue.js', icon: 'skill-icons:vuejs-light' },
			{ name: 'React', icon: 'skill-icons:react-light' },
			{ name: 'Next.js', icon: 'skill-icons:nextjs-light' },
			{ name: 'Tailwind CSS', icon: 'skill-icons:tailwindcss-light' },
			{ name: 'Sass', icon: 'skill-icons:sass' }
		]
	},
	{
		category: '後端開發',
		skills: [
			{ name: 'Node.js', icon: 'skill-icons:nodejs-light' },
			{ name: 'Python', icon: 'skill-icons:python-light' },
			{ name: 'Express', icon: 'skill-icons:expressjs-light' },
			{ name: 'FastAPI', icon: 'skill-icons:fastapi' },
			{ name: 'Prisma', icon: 'skill-icons:prisma' }
		]
	},
	{
		category: '資料管理',
		skills: [
			{ name: 'PostgreSQL', icon: 'skill-icons:postgresql-light' },
			{ name: 'Redis', icon: 'skill-icons:redis-light' },
			{ name: 'MongoDB', icon: 'skill-icons:mongodb' },
			{ name: 'SQLite', icon: 'skill-icons:sqlite' }
		]
	},
	{
		category: '網路與伺服器',
		skills: [
			{ name: 'Docker', icon: 'skill-icons:docker' },
			{ name: 'GitHub Actions', icon: 'skill-icons:githubactions-light' },
			{ name: 'AWS', icon: 'skill-icons:aws-light' },
			{ name: 'GCP', icon: 'skill-icons:gcp-light' },
			{ name: 'Vercel', icon: 'skill-icons:vercel-light' },
			{ name: 'Railway', icon: 'devicon:railway' },
			{ name: 'Cloudflare', icon: 'skill-icons:cloudflare-light' },
			{ name: 'NGINX', icon: 'skill-icons:nginx' }
		]
	}
];
