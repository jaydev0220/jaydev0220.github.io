import type { Project, ProjectType } from './types';

export const projects: Project[] = [
	{
		title: 'Ping Board',
		description:
			'A distributed uptime monitoring platform with status pages, latency tracking, and 90-day historical charts, built for reliable service observability and responsive dashboard visibility.',
		type: ['monitoring', 'tool'],
		technologies: ['Svelte', 'Tailwind CSS', 'TypeScript', 'RWD', 'Express'],
		githubUrl: 'https://github.com/jaydev0220/ping-board',
		liveUrl: 'https://ping-board.mengche.dev'
	},
	{
		title: 'CommNode',
		description:
			'A real-time communication platform with email/Google authentication, friend management, direct and group chats, WebSocket message mutations, file attachments, profile settings, and realtime notification pushes for friend requests and new messages.',
		type: ['communication'],
		technologies: ['Svelte', 'Tailwind CSS', 'TypeScript', 'Express', 'PostgreSQL'],
		githubUrl: 'https://github.com/jaydev0220/comm-node'
	},
	{
		title: "Butter's Personal Website",
		description:
			'A performant Svelte website for Butter 巴特, combining theme tokens, Runes-based state management, and responsive design for a refined personal brand presence.',
		type: ['landing page'],
		technologies: ['Svelte', 'Tailwind CSS', 'TypeScript', 'RWD'],
		githubUrl: 'https://github.com/eddyb5201314-afk/eddyb5201314-afk.github.io',
		liveUrl: 'https://eddyb5201314-afk.github.io'
	},
	{
		title: "SuiSui's Personal Website",
		description:
			'A high-performance Svelte website for VTuber 水水, optimized for static deployment, responsive presentation, and a modern branded fan experience.',
		type: ['landing page'],
		technologies: ['Svelte', 'Tailwind CSS', 'TypeScript', 'RWD'],
		githubUrl: 'https://github.com/suisui0528/suisui0528.github.io',
		liveUrl: 'https://suisui0528.github.io'
	},
	{
		title: 'Pomodoro Timer',
		description:
			'A Vue 3 productivity timer with configurable work and break cycles, transition alerts, and volume control, designed for focused deep-work sessions across devices.',
		type: ['tool'],
		technologies: ['Vue.js', 'CSS', 'JavaScript', 'RWD'],
		githubUrl: 'https://github.com/jaydev0220/pomodoro-timer',
		liveUrl: 'https://www.mengche.dev/pomodoro-timer'
	},
	{
		title: 'Simple TODO List',
		description:
			'A React and TypeScript task manager with local persistence, theme switching, and component-based state handling, built for clear UX and maintainable front-end architecture.',
		type: ['tool'],
		technologies: ['React', 'CSS', 'TypeScript', 'RWD'],
		githubUrl: 'https://github.com/jaydev0220/simple-todo-list',
		liveUrl: 'https://www.mengche.dev/simple-todo-list'
	},
	{
		title: 'Daily Quote Generator',
		description:
			'A lightweight quote app that serves random daily inspiration, stores in local storage, and delivers a responsive, polished reading experience with clean vanilla HTML, CSS, and JavaScript.',
		type: ['creative'],
		technologies: ['HTML', 'CSS', 'JavaScript', 'RWD', 'Local Storage'],
		githubUrl: 'https://github.com/jaydev0220/daily-quote-generator',
		liveUrl: 'https://www.mengche.dev/daily-quote-generator'
	},
	{
		title: 'Unlockture 2025 Memorial',
		description:
			'An immersive Vue 3 fullscreen storytelling experience with custom scroll behavior, smooth section transitions, and multi-section navigation for high-impact event presentation.',
		type: ['creative'],
		technologies: ['Vue.js', 'Sass', 'TypeScript', 'RWD'],
		githubUrl: 'https://github.com/jaydev0220/unlockture-2025-memorial',
		liveUrl: 'https://www.mengche.dev/unlockture-2025-memorial'
	},
	{
		title: 'CSS 3D',
		description:
			'A compact CSS 3D demo showcasing animated cubes, layered transforms, and axis-based spin effects, built to demonstrate spatial motion and modern CSS rendering.',
		type: ['creative'],
		technologies: ['HTML', 'CSS', 'RWD'],
		githubUrl: 'https://github.com/jaydev0220/css-3d',
		liveUrl: 'https://www.mengche.dev/css-3d'
	},
	{
		title: 'Color Palette',
		description:
			'A fast Svelte tool for generating, previewing, and refining color systems in real time, helping developers and designers build consistent UI themes with export-ready output.',
		type: ['tool'],
		technologies: ['Svelte', 'Tailwind CSS', 'TypeScript'],
		githubUrl: 'https://github.com/jaydev0220/color-palette',
		liveUrl: 'https://www.mengche.dev/color-palette'
	},
	{
		title: 'Password Strength Checker',
		description:
			'A Python password analyzer that scores strength by length, entropy signals, and common-pattern detection, then returns actionable guidance to improve security.',
		type: ['tool'],
		technologies: ['Python'],
		githubUrl: 'https://github.com/jaydev0220/password-strength-checker',
		liveUrl: 'https://www.mengche.dev/password-strength-checker'
	}
];

export const projectFilters: { label: string; type: ProjectType }[] = [
	{ label: '全部', type: 'all' },
	{ label: '形象網頁', type: 'landing page' },
	{ label: '監控', type: 'monitoring' },
	{ label: '通訊', type: 'communication' },
	{ label: '工具', type: 'tool' },
	{ label: '創意程式', type: 'creative' }
];
