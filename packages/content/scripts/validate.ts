import { access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/projects';
import { services } from '../src/services';
import { site } from '../src/site';

const errors: string[] = [];

const duplicateValues = (values: readonly string[]) =>
	values.filter((value, index) => values.indexOf(value) !== index);

for (const duplicate of duplicateValues(projects.map((project) => project.slug))) {
	errors.push(`projects.${duplicate} has a duplicate slug`);
}

for (const duplicate of duplicateValues(services.map((service) => service.id))) {
	errors.push(`services.${duplicate} has a duplicate id`);
}

for (const service of services) {
	if (service.startingPriceTwd <= 0 || service.approximatePriceUsd <= 0) {
		errors.push(`services.${service.id} prices must be positive`);
	}
	if (
		service.deliveryRange.maximumWeeks &&
		service.deliveryRange.maximumWeeks < service.deliveryRange.minimumWeeks
	) {
		errors.push(`services.${service.id}.deliveryRange is invalid`);
	}
}

for (const project of projects) {
	for (const action of project.actions) {
		try {
			const url = new URL(action.url);
			if (url.protocol !== 'https:') throw new Error('HTTPS required');
		} catch {
			errors.push(`projects.${project.slug}.${action.label} must be a valid HTTPS URL`);
		}
	}

	for (const [index, imageUrl] of project.images.entries()) {
		try {
			const url = new URL(imageUrl);
			if (url.protocol !== 'https:') throw new Error('HTTPS required');
		} catch {
			errors.push(`projects.${project.slug}.images.${index} must be a valid HTTPS URL`);
		}
	}

	if (project.featured) {
		for (const locale of ['en', 'zh-tw'] as const) {
			const path = fileURLToPath(new URL(`../case-studies/${locale}/${project.slug}.md`, import.meta.url));
			try {
				await access(path);
			} catch {
				errors.push(`case-studies/${locale}/${project.slug}.md is missing`);
			}
		}
	}
}

const publishedServiceIds = services.map((service) => service.id).sort();
const formServiceIds = [...site.serviceOptions].sort();
if (publishedServiceIds.join('|') !== formServiceIds.join('|')) {
	errors.push('site.serviceOptions differs from published services');
}

if (errors.length > 0) {
	console.error(errors.join('\n'));
	process.exit(1);
}

console.log(
	`Validated ${services.length} services, ${projects.length} projects, and bilingual case-study coverage.`
);
