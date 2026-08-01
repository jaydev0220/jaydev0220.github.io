import ButterPersonalWebsiteEn from '../case-studies/en/butter-personal-website.md';
import NrgCommerceEn from '../case-studies/en/nrg-commerce.md';
import EvoSnakeEn from '../case-studies/en/evosnake.md';
import ButterPersonalWebsiteZh from '../case-studies/zh-tw/butter-personal-website.md';
import NrgCommerceZh from '../case-studies/zh-tw/nrg-commerce.md';
import EvoSnakeZh from '../case-studies/zh-tw/evosnake.md';

export const caseStudyComponents = {
	en: {
		'butter-personal-website': ButterPersonalWebsiteEn,
		'nrg-commerce': NrgCommerceEn,
		evosnake: EvoSnakeEn
	},
	'zh-TW': {
		'butter-personal-website': ButterPersonalWebsiteZh,
		'nrg-commerce': NrgCommerceZh,
		evosnake: EvoSnakeZh
	}
} as const;
