import type { Education, ResumeData, SocialLink } from './types';

export const resume: ResumeData = {
	name: '謝孟哲',
	title: '全端工程師',
	location: '台灣・新竹',
	email: 'contact@mengche.dev',
	about: [
		'我是 謝孟哲，你可以叫我 阿哲 或 Jay！',
		'我是一名對開發充滿熱情的學生，有 4 年全端開發經驗，熟悉 Node.js、Svelte 與 TypeScript。',
		'目前持續精進中，也歡迎任何交流與合作機會！'
	]
};

export const socialLinks: SocialLink[] = [
	{
		name: 'Facebook',
		url: 'https://www.facebook.com/jaydev0220/',
		icon: 'logos:facebook'
	},
	{
		name: 'Discord',
		url: 'https://discordapp.com/users/263613963034427392',
		icon: 'logos:discord-icon'
	},
	{
		name: 'GitHub',
		url: 'https://github.com/jaydev0220',
		icon: 'simple-icons:github'
	},
	{
		name: 'LinkedIn',
		url: 'https://linkedin.com/in/mengche0220',
		icon: 'logos:linkedin-icon'
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
