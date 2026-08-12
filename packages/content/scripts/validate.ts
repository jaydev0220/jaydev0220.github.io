import { access, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { projects } from '../src/projects';
import { services } from '../src/services';
import { profile, site } from '../src/site';
import { commercialPages, serviceProjectRelationships } from '../src/commercial-pages';

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

  if (!/^\d{4}-\d{2}-\d{2}$/.test(project.publishedAt) || Number.isNaN(Date.parse(project.publishedAt))) {
    errors.push(`projects.${project.slug}.publishedAt must be an ISO date`);
  }
  if (project.updatedAt && (Number.isNaN(Date.parse(project.updatedAt)) || project.updatedAt < project.publishedAt)) {
    errors.push(`projects.${project.slug}.updatedAt must be an ISO date on or after publishedAt`);
  }
  if (project.seoDescription.en.length < 120 || project.seoDescription.en.length > 160) {
    errors.push(`projects.${project.slug}.seoDescription.en must be 120-160 characters`);
  }

  for (const [index, image] of project.images.entries()) {
    try {
      const url = new URL(image.url);
      if (url.protocol !== 'https:') throw new Error('HTTPS required');
    } catch {
      errors.push(`projects.${project.slug}.images.${index} must be a valid HTTPS URL`);
    }
    if (image.width <= 0 || image.height <= 0 || image.mimeType !== 'image/webp') {
      errors.push(`projects.${project.slug}.images.${index} needs WebP dimensions`);
    }
    if (!image.alt.en || !image.alt['zh-TW'] || /screenshot\s+\d/i.test(image.alt.en)) {
      errors.push(`projects.${project.slug}.images.${index} needs descriptive bilingual alt text`);
    }
  }

  if (project.featured) {
    for (const locale of ['en', 'zh-tw'] as const) {
      const path = fileURLToPath(new URL(`../case-studies/${locale}/${project.slug}.md`, import.meta.url));
      try {
        await access(path);
        const markdown = await readFile(path, 'utf8');
        for (const heading of [
          locale === 'en' ? '## Fit, deliverables, and exclusions' : '## 適合情況、交付物與排除項目',
          locale === 'en' ? '## Risks and review questions' : '## 風險與審查問題'
        ]) {
          if (!markdown.includes(heading)) {
            errors.push(`case-studies/${locale}/${project.slug}.md is missing ${heading}`);
          }
        }
      } catch {
        errors.push(`case-studies/${locale}/${project.slug}.md is missing`);
      }
    }
  }
}

for (const relationship of serviceProjectRelationships) {
  if (!services.some((service) => service.id === relationship.serviceId)) {
    errors.push(`relationships.${relationship.serviceId} references an unknown service`);
  }
  for (const slug of relationship.projectSlugs) {
    if (!projects.some((project) => project.slug === slug)) {
      errors.push(`relationships.${relationship.serviceId} references unknown project ${slug}`);
    }
  }
}

const titles = Object.values(commercialPages).flatMap((page) => [page.title.en, page.title['zh-TW']]);
for (const duplicate of duplicateValues(titles)) errors.push(`commercial metadata title is duplicated: ${duplicate}`);

for (const [pageId, page] of Object.entries(commercialPages)) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(page.publishedAt) || Number.isNaN(Date.parse(page.publishedAt))) {
    errors.push(`commercialPages.${pageId}.publishedAt must be an ISO date`);
  }
  if (page.description.en.length < 120 || page.description.en.length > 160) {
    errors.push(`commercialPages.${pageId}.description.en must be 120-160 characters`);
  }
  for (const section of page.sections) {
    if (!section.heading.en || !section.heading['zh-TW'] || section.paragraphs.length === 0) {
      errors.push(`commercialPages.${pageId}.sections.${section.id} must have bilingual substantive content`);
    }
    if (section.paragraphs.some((paragraph) => !paragraph.en || !paragraph['zh-TW'])) {
      errors.push(`commercialPages.${pageId}.sections.${section.id} has incomplete locale parity`);
    }
  }
}

const englishWords = (value: string) => value.trim().split(/\s+/).filter(Boolean).length;
const pageCoverage = (pageId: keyof typeof commercialPages) => {
  const page = commercialPages[pageId];
  let text = [
    page.heading.en,
    page.description.en,
    ...page.sections.flatMap((section) => [
      section.heading.en,
      ...section.paragraphs.map((paragraph) => paragraph.en),
      ...(section.bullets?.map((bullet) => bullet.en) ?? [])
    ])
  ].join(' ');
  if (pageId === 'services') {
    text += ` ${services
      .flatMap((service) => [
        service.title.en,
        service.summary.en,
        service.idealFor.en,
        ...service.deliverables.map((item) => item.en),
        ...service.exclusions.map((item) => item.en)
      ])
      .join(' ')}`;
  }
  if (pageId === 'projects') {
    text += ` ${projects.flatMap((project) => [project.category.en, project.summary.en]).join(' ')}`;
  }
  if (pageId === 'about') {
    text += ` ${[profile.biography.en, ...profile.capabilities.map((item) => item.en)].join(' ')}`;
  }
  return englishWords(text);
};

const coverageFloors = { home: 500, services: 800, projects: 400, about: 400 } as const;
for (const [pageId, floor] of Object.entries(coverageFloors)) {
  const count = pageCoverage(pageId as keyof typeof coverageFloors);
  if (count < floor) console.warn(`Quality warning: ${pageId} English coverage is ${count} words; review target is ${floor}+`);
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
