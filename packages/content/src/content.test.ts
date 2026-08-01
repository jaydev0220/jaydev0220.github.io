import { describe, expect, it } from 'vitest';
import { featuredProjects, projects } from './projects';
import { services } from './services';
import { site } from './site';

describe('public content relationships', () => {
	it('uses unique project slugs and service ids', () => {
		expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
		expect(new Set(services.map((service) => service.id)).size).toBe(services.length);
	});

	it('keeps published form service options aligned with services', () => {
		expect([...site.serviceOptions].sort()).toEqual(services.map((service) => service.id).sort());
	});

	it('has exactly three featured case studies', () => {
		expect(featuredProjects.map((project) => project.slug)).toEqual([
			'butter-personal-website',
			'nrg-commerce',
			'evosnake'
		]);
	});
});
