import type { ParamMatcher } from '@sveltejs/kit';

export const match: ParamMatcher = (value) => value === 'en' || value === 'zh-tw';
