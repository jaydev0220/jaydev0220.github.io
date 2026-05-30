import type { Certificate } from './types';

export const certificates: Certificate[] = [
	{
		name: 'TOEIC Gold (885)',
		issuer: 'ETS',
		date: '2023',
		credentialUrl: 'https://cdn.mengche.dev/certificates/toeic-2023.webp'
	},
	{
		name: '工業電子丙級',
		issuer: '中華民國勞動部',
		date: '2023',
		credentialUrl: 'https://cdn.mengche.dev/certificates/industrial-electronics-c.webp'
	},
	{
		name: '工業配線丙級',
		issuer: '中華民國勞動部',
		date: '2022',
		credentialUrl: 'https://cdn.mengche.dev/certificates/industrial-wiring-c.webp'
	},
	{
		name: 'GEPT 中級',
		issuer: 'LTTC',
		date: '2019',
		credentialUrl: 'https://cdn.mengche.dev/certificates/gept-intermediate.webp'
	},
	{
		name: 'GEPT 初級',
		issuer: 'LTTC',
		date: '2018',
		credentialUrl: 'https://cdn.mengche.dev/certificates/gept-elementary.webp'
	}
];
