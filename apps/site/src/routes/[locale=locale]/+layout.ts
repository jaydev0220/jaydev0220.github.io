import type { LayoutLoad } from './$types';
import type { UrlLocale } from '@mengche/content';

export const load: LayoutLoad = ({ params }) => ({ locale: params.locale as UrlLocale });
