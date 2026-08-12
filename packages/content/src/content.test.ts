import { describe, expect, it } from 'vitest';
import { featuredProjects, projects } from './projects';
import { services } from './services';
import { site } from './site';
import {
  commercialPages,
  relatedProjectSlugs,
  serviceIdsForProject,
  serviceProjectRelationships
} from './commercial-pages';

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

  it('keeps the approved service-to-project relationship map', () => {
    expect(serviceProjectRelationships).toEqual([
      { serviceId: 'marketing-site', projectSlugs: ['butter-personal-website'] },
      {
        serviceId: 'portfolio-business-site',
        projectSlugs: ['butter-personal-website', 'nrg-commerce']
      },
      { serviceId: 'full-stack-application', projectSlugs: ['nrg-commerce', 'evosnake'] }
    ]);
    expect(serviceIdsForProject('nrg-commerce')).toEqual([
      'portfolio-business-site',
      'full-stack-application'
    ]);
    expect(relatedProjectSlugs('evosnake')).toEqual(['nrg-commerce']);
  });

  it('keeps commercial metadata unique and substantive in both locales', () => {
    const pages = Object.values(commercialPages);
    expect(new Set(pages.map((page) => page.title.en)).size).toBe(pages.length);
    expect(new Set(pages.map((page) => page.title['zh-TW'])).size).toBe(pages.length);

    for (const page of pages) {
      expect(page.description.en.length).toBeGreaterThanOrEqual(120);
      expect(page.description.en.length).toBeLessThanOrEqual(160);
      expect(page.sections.length).toBeGreaterThan(0);
      for (const section of page.sections) {
        expect(section.heading.en).toBeTruthy();
        expect(section.heading['zh-TW']).toBeTruthy();
        expect(section.paragraphs.every((paragraph) => paragraph.en && paragraph['zh-TW'])).toBe(true);
      }
    }
  });
});
