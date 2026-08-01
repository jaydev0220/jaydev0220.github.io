import { error } from '@sveltejs/kit';
import { projectBySlug } from '@mengche/content';
import type { PageLoad } from './$types';

export const load: PageLoad = ({ params }) => {
	const project = projectBySlug[params.slug as keyof typeof projectBySlug];
	if (!project?.featured) error(404, 'Project not found');
	return { project };
};
