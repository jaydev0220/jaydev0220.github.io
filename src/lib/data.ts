export interface SocialLink {
	name: string;
	url: string;
	icon: string;
}

export interface Education {
	degree: string;
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
	phone: string;
	about: string;
	aboutExtended: string[];
}

// About Information
export const resume: ResumeData = {
	name: 'Meng Che',
	title: 'Fullstack Developer',
	location: 'San Francisco, CA',
	email: 'mengche@example.com',
	phone: '+1 (555) 123-4567',
	about:
		'Passionate fullstack developer with expertise in building scalable web applications and data-driven solutions.',
	aboutExtended: [
		'I specialize in creating modern, responsive web applications using cutting-edge technologies. With a strong foundation in both frontend and backend development, I bring ideas to life through clean, maintainable code.',
		'My approach combines technical expertise with user-centered design, ensuring that every project not only works flawlessly but also provides an exceptional user experience.',
		"When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or mentoring aspiring developers."
	]
};

// Contact and Social Links
export const socialLinks: SocialLink[] = [
	{
		name: 'GitHub',
		url: 'https://github.com/mengche',
		icon: '👨‍💻'
	},
	{
		name: 'LinkedIn',
		url: 'https://linkedin.com/in/mengche',
		icon: '💼'
	},
	{
		name: 'Twitter',
		url: 'https://twitter.com/mengche',
		icon: '🐦'
	},
	{
		name: 'Email',
		url: 'mailto:mengche@example.com',
		icon: '📧'
	}
];

// Education History
export const education: Education[] = [
	{
		degree: 'Master of Science in Computer Science',
		institution: 'Stanford University',
		period: '2018 - 2020',
		location: 'Stanford, CA',
		description:
			'Specialized in distributed systems and machine learning. Thesis on scalable microservices architecture.'
	},
	{
		degree: 'Bachelor of Science in Software Engineering',
		institution: 'UC Berkeley',
		period: '2014 - 2018',
		location: 'Berkeley, CA',
		description: "Dean's List all semesters. Focus on web technologies and algorithms."
	}
];

// Skills grouped by categories
export const skillCategories: SkillCategory[] = [
	{
		category: 'Frontend',
		skills: [
			{ name: 'React', icon: '⚛️' },
			{ name: 'Vue.js', icon: '💚' },
			{ name: 'Svelte', icon: '🧡' },
			{ name: 'TypeScript', icon: '📘' },
			{ name: 'Tailwind CSS', icon: '🎨' },
			{ name: 'Next.js', icon: '▲' }
		]
	},
	{
		category: 'Backend',
		skills: [
			{ name: 'Node.js', icon: '🟢' },
			{ name: 'Python', icon: '🐍' },
			{ name: 'Go', icon: '🔵' },
			{ name: 'Express', icon: '🚂' },
			{ name: 'FastAPI', icon: '⚡' },
			{ name: 'GraphQL', icon: '🔷' }
		]
	},
	{
		category: 'Data Management',
		skills: [
			{ name: 'PostgreSQL', icon: '🐘' },
			{ name: 'MongoDB', icon: '🍃' },
			{ name: 'Redis', icon: '🔴' },
			{ name: 'Prisma', icon: '⬡' },
			{ name: 'Supabase', icon: '💚' }
		]
	},
	{
		category: 'CI/CD',
		skills: [
			{ name: 'Docker', icon: '🐳' },
			{ name: 'GitHub Actions', icon: '⚙️' },
			{ name: 'AWS', icon: '☁️' },
			{ name: 'Vercel', icon: '▲' },
			{ name: 'Kubernetes', icon: '☸️' }
		]
	},
	{
		category: 'Tools',
		skills: [
			{ name: 'Git', icon: '📦' },
			{ name: 'VS Code', icon: '💻' },
			{ name: 'Figma', icon: '🎨' },
			{ name: 'Postman', icon: '📮' },
			{ name: 'Jest', icon: '🃏' },
			{ name: 'Playwright', icon: '🎭' }
		]
	}
];

// Projects with type classification
export const projects: Project[] = [
	{
		id: 'ecommerce-platform',
		title: 'E-Commerce Platform',
		description:
			'Full-featured e-commerce platform with real-time inventory management, payment processing, and admin dashboard.',
		type: ['web'],
		technologies: ['Next.js', 'TypeScript', 'PostgreSQL', 'Stripe', 'Tailwind CSS'],
		githubUrl: 'https://github.com/mengche/ecommerce-platform',
		liveUrl: 'https://ecommerce-demo.example.com'
	},
	{
		id: 'task-manager-mobile',
		title: 'Task Manager Mobile App',
		description:
			'Cross-platform mobile application for task management with offline support and cloud synchronization.',
		type: ['mobile'],
		technologies: ['React Native', 'TypeScript', 'Firebase', 'Redux'],
		githubUrl: 'https://github.com/mengche/task-manager-mobile'
	},
	{
		id: 'data-visualization-dashboard',
		title: 'Data Visualization Dashboard',
		description:
			'Interactive dashboard for visualizing large datasets with real-time updates and custom chart configurations.',
		type: ['web', 'data'],
		technologies: ['React', 'D3.js', 'Python', 'FastAPI', 'WebSocket'],
		githubUrl: 'https://github.com/mengche/data-viz-dashboard',
		liveUrl: 'https://dataviz-demo.example.com'
	},
	{
		id: 'ai-content-generator',
		title: 'AI Content Generator',
		description:
			'AI-powered content generation tool using GPT models with custom fine-tuning and prompt optimization.',
		type: ['web', 'automation'],
		technologies: ['Svelte', 'Python', 'OpenAI API', 'PostgreSQL'],
		githubUrl: 'https://github.com/mengche/ai-content-gen',
		liveUrl: 'https://ai-content.example.com'
	},
	{
		id: 'devops-automation-suite',
		title: 'DevOps Automation Suite',
		description:
			'Comprehensive DevOps toolkit for automating deployment pipelines, monitoring, and infrastructure management.',
		type: ['automation'],
		technologies: ['Go', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
		githubUrl: 'https://github.com/mengche/devops-suite'
	},
	{
		id: 'social-media-analytics',
		title: 'Social Media Analytics',
		description:
			'Analytics platform for tracking social media metrics with ML-powered sentiment analysis and trend detection.',
		type: ['web', 'data'],
		technologies: ['Vue.js', 'Python', 'MongoDB', 'TensorFlow', 'Chart.js'],
		githubUrl: 'https://github.com/mengche/social-analytics',
		liveUrl: 'https://social-analytics.example.com'
	},
	{
		id: 'fitness-tracker-app',
		title: 'Fitness Tracker App',
		description:
			'Mobile fitness tracking application with workout plans, progress tracking, and health metrics visualization.',
		type: ['mobile'],
		technologies: ['Flutter', 'Dart', 'Firebase', 'HealthKit'],
		githubUrl: 'https://github.com/mengche/fitness-tracker'
	},
	{
		id: 'real-time-chat-platform',
		title: 'Real-Time Chat Platform',
		description:
			'Scalable real-time chat platform with channels, direct messaging, file sharing, and video calls.',
		type: ['web'],
		technologies: ['React', 'Node.js', 'Socket.io', 'WebRTC', 'Redis', 'MongoDB'],
		githubUrl: 'https://github.com/mengche/chat-platform',
		liveUrl: 'https://chat-demo.example.com'
	},
	{
		id: 'inventory-management-system',
		title: 'Inventory Management System',
		description:
			'Enterprise inventory management system with barcode scanning, automated reordering, and multi-warehouse support.',
		type: ['web', 'automation'],
		technologies: ['Angular', 'Java', 'Spring Boot', 'PostgreSQL', 'Docker'],
		githubUrl: 'https://github.com/mengche/inventory-system'
	}
];

// Navigation links
export const navLinks = [
	{ label: 'About', href: '#about' },
	{ label: 'Tech Stack', href: '#tech-stack' },
	{ label: 'Portfolio', href: '#portfolio' },
	{ label: 'Contact', href: '#contact' }
];

// Hero typing animation strings
export const typingStrings = ["Hi, I'm Meng Che.", "I'm a Fullstack Developer."];

// Project type filters
export const projectFilters: { label: string; type: ProjectType }[] = [
	{ label: 'All Projects', type: 'all' },
	{ label: 'Web Apps', type: 'web' },
	{ label: 'Mobile Apps', type: 'mobile' },
	{ label: 'Data & Analytics', type: 'data' },
	{ label: 'Automation', type: 'automation' }
];
