import { describe, expect, it } from 'vitest';
import { projectBySlug } from './projects';
import {
  buildAboutSchema,
  buildContactSchema,
  buildPersonNode,
  buildPrivacySchema,
  buildProjectSchema,
  buildProjectsSchema,
  buildServicesSchema
} from './schemas';

const graph = (schema: Record<string, unknown>) => schema['@graph'] as Record<string, unknown>[];

describe('schema builders', () => {
  it('uses one stable person identity with profiles, contact, and credentials', () => {
    const person = buildPersonNode();
    expect(person).toMatchObject({
      '@id': 'https://www.mengche.dev/#person',
      name: '謝孟哲',
      alternateName: 'Jay Hsieh',
      url: 'https://www.mengche.dev/#person',
      email: 'mailto:contact@mengche.dev'
    });
    expect(person).not.toHaveProperty('description');
    expect(person).not.toHaveProperty('jobTitle');
    expect(person.sameAs).toHaveLength(4);
    expect(person.hasCredential).toHaveLength(2);

    const enPerson = graph(buildAboutSchema('en')).find((node) => node['@type'] === 'Person');
    const zhPerson = graph(buildAboutSchema('zh-tw')).find((node) => node['@type'] === 'Person');
    expect(enPerson).toEqual(zhPerson);
  });

  it('builds services as positioned ListItems containing Service nodes', () => {
    const nodes = graph(buildServicesSchema('zh-tw'));
    const list = nodes.find((node) => node['@type'] === 'ItemList');
    expect(list).toBeDefined();
    const items = list?.itemListElement as Record<string, unknown>[];
    expect(items).toHaveLength(3);
    expect(items[0]).toMatchObject({ '@type': 'ListItem', position: 1 });
    expect(items[0].item).toMatchObject({ '@type': 'Service' });
  });

  it('builds collection and page schemas with localized breadcrumbs', () => {
    expect(graph(buildProjectsSchema('en')).some((node) => node['@type'] === 'CollectionPage')).toBe(true);
    expect(graph(buildContactSchema('en')).some((node) => node['@type'] === 'ContactPage')).toBe(true);
    expect(graph(buildPrivacySchema('zh-tw')).some((node) => node['@type'] === 'WebPage')).toBe(true);
    const aboutBreadcrumb = graph(buildAboutSchema('zh-tw')).find(
      (node) => node['@type'] === 'BreadcrumbList'
    );
    expect(aboutBreadcrumb?.itemListElement).toMatchObject([{ name: '首頁' }, { name: '關於謝孟哲' }]);
  });

  it('builds case studies as dated Articles about their typed subjects', () => {
    const nodes = graph(buildProjectSchema('en', projectBySlug.evosnake));
    const article = nodes.find((node) => node['@type'] === 'Article');
    expect(article).toMatchObject({
      headline: 'EvoSnake',
      datePublished: '2026-08-01',
      author: { '@id': 'https://www.mengche.dev/#person' },
      about: { '@type': 'VideoGame' }
    });
    expect(article?.dateModified).toBeUndefined();
    expect(article?.image).toHaveLength(3);
  });
});
