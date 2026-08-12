import { commercialPages } from './commercial-pages';
import { projects } from './projects';
import { services } from './services';
import { profile, site, socialLinks } from './site';
import { localeFromUrl, text, type Project, type UrlLocale } from './types';

type SchemaNode = Record<string, unknown>;

export const pageDates = {
  home: { publishedAt: '2026-08-01' },
  services: { publishedAt: '2026-08-01' },
  projects: { publishedAt: '2026-08-01' },
  about: { publishedAt: '2026-08-01' },
  contact: { publishedAt: '2026-08-01' },
  privacy: { publishedAt: '2026-08-01' }
} as const;

const language = (locale: UrlLocale) => localeFromUrl(locale);
const pageUrl = (locale: UrlLocale, path = '') => `${site.canonicalOrigin}/${locale}${path}`;

export function buildPersonNode(locale: UrlLocale): SchemaNode {
  const contentLocale = language(locale);
  return {
    '@type': 'Person',
    '@id': `${site.canonicalOrigin}/#person`,
    name: '謝孟哲',
    alternateName: 'Jay Hsieh',
    description: text(profile.biography, contentLocale),
    jobTitle: text(profile.role, contentLocale),
    url: pageUrl(locale, '/about'),
    email: `mailto:${site.email}`,
    address: { '@type': 'PostalAddress', addressCountry: 'TW' },
    sameAs: socialLinks.map((social) => social.url),
    hasCredential: profile.qualifications.map((qualification) => ({
      '@type': 'EducationalOccupationalCredential',
      name: qualification.name,
      recognizedBy: { '@type': 'Organization', name: qualification.issuer },
      dateCreated: String(qualification.year),
      url: qualification.credentialUrl
    }))
  };
}

export function buildWebsiteSchema(): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${site.canonicalOrigin}/#website`,
    name: site.brand,
    alternateName: 'mengche.dev',
    url: `${site.canonicalOrigin}/`
  };
}

function breadcrumb(locale: UrlLocale, currentName: string, path: string): SchemaNode {
  const homeName = locale === 'zh-tw' ? '首頁' : 'Home';
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl(locale, path)}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeName, item: pageUrl(locale) },
      { '@type': 'ListItem', position: 2, name: currentName, item: pageUrl(locale, path) }
    ]
  };
}

function projectBreadcrumb(locale: UrlLocale, project: Project): SchemaNode {
  const homeName = locale === 'zh-tw' ? '首頁' : 'Home';
  const projectsName = locale === 'zh-tw' ? '專案' : 'Projects';
  const path = `/projects/${project.slug}`;
  return {
    '@type': 'BreadcrumbList',
    '@id': `${pageUrl(locale, path)}#breadcrumb`,
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: homeName, item: pageUrl(locale) },
      { '@type': 'ListItem', position: 2, name: projectsName, item: pageUrl(locale, '/projects') },
      { '@type': 'ListItem', position: 3, name: project.title, item: pageUrl(locale, path) }
    ]
  };
}

function pageGraph(locale: UrlLocale, page: SchemaNode, extras: SchemaNode[] = []): SchemaNode {
  return {
    '@context': 'https://schema.org',
    '@graph': [page, buildPersonNode(locale), ...extras]
  };
}

export function buildHomeSchema(locale: UrlLocale): SchemaNode {
  const contentLocale = language(locale);
  const content = commercialPages.home;
  return pageGraph(locale, {
    '@type': 'WebPage',
    '@id': `${pageUrl(locale)}#webpage`,
    name: text(content.heading, contentLocale),
    description: text(content.description, contentLocale),
    url: pageUrl(locale),
    inLanguage: contentLocale,
    datePublished: content.publishedAt,
    isPartOf: { '@id': `${site.canonicalOrigin}/#website` },
    about: { '@id': `${site.canonicalOrigin}/#person` }
  });
}

export function buildServicesSchema(locale: UrlLocale): SchemaNode {
  const contentLocale = language(locale);
  const content = commercialPages.services;
  const url = pageUrl(locale, '/services');
  return pageGraph(
    locale,
    {
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      name: text(content.heading, contentLocale),
      description: text(content.description, contentLocale),
      url,
      inLanguage: contentLocale,
      datePublished: content.publishedAt,
      breadcrumb: { '@id': `${url}#breadcrumb` },
      mainEntity: { '@id': `${url}#services` }
    },
    [
      breadcrumb(locale, text(content.heading, contentLocale), '/services'),
      {
        '@type': 'ItemList',
        '@id': `${url}#services`,
        itemListElement: services.map((service, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: `${url}#${service.id}`,
          item: {
            '@type': 'Service',
            '@id': `${url}#${service.id}`,
            name: text(service.title, contentLocale),
            description: text(service.summary, contentLocale),
            provider: { '@id': `${site.canonicalOrigin}/#person` }
          }
        }))
      }
    ]
  );
}

export function buildProjectsSchema(locale: UrlLocale): SchemaNode {
  const contentLocale = language(locale);
  const content = commercialPages.projects;
  const url = pageUrl(locale, '/projects');
  return pageGraph(
    locale,
    {
      '@type': 'CollectionPage',
      '@id': `${url}#webpage`,
      name: text(content.heading, contentLocale),
      description: text(content.description, contentLocale),
      url,
      inLanguage: contentLocale,
      datePublished: content.publishedAt,
      breadcrumb: { '@id': `${url}#breadcrumb` },
      mainEntity: { '@id': `${url}#projects` }
    },
    [
      breadcrumb(locale, text(content.heading, contentLocale), '/projects'),
      {
        '@type': 'ItemList',
        '@id': `${url}#projects`,
        itemListElement: projects.map((project, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          url: pageUrl(locale, `/projects/${project.slug}`),
          name: project.title
        }))
      }
    ]
  );
}

export function buildAboutSchema(locale: UrlLocale): SchemaNode {
  const contentLocale = language(locale);
  const content = commercialPages.about;
  const url = pageUrl(locale, '/about');
  return pageGraph(
    locale,
    {
      '@type': 'ProfilePage',
      '@id': `${url}#webpage`,
      name: text(content.heading, contentLocale),
      description: text(content.description, contentLocale),
      url,
      inLanguage: contentLocale,
      datePublished: content.publishedAt,
      breadcrumb: { '@id': `${url}#breadcrumb` },
      mainEntity: { '@id': `${site.canonicalOrigin}/#person` }
    },
    [breadcrumb(locale, text(content.heading, contentLocale), '/about')]
  );
}

export function buildContactSchema(locale: UrlLocale): SchemaNode {
  const name = locale === 'zh-tw' ? '委託專案' : 'Start a project';
  const url = pageUrl(locale, '/contact');
  return pageGraph(
    locale,
    {
      '@type': 'ContactPage',
      '@id': `${url}#webpage`,
      name,
      url,
      inLanguage: language(locale),
      datePublished: pageDates.contact.publishedAt,
      breadcrumb: { '@id': `${url}#breadcrumb` },
      about: { '@id': `${site.canonicalOrigin}/#person` }
    },
    [breadcrumb(locale, name, '/contact')]
  );
}

export function buildPrivacySchema(locale: UrlLocale): SchemaNode {
  const name = locale === 'zh-tw' ? '隱私權政策' : 'Privacy policy';
  const url = pageUrl(locale, '/privacy');
  return pageGraph(
    locale,
    {
      '@type': 'WebPage',
      '@id': `${url}#webpage`,
      name,
      url,
      inLanguage: language(locale),
      datePublished: pageDates.privacy.publishedAt,
      breadcrumb: { '@id': `${url}#breadcrumb` }
    },
    [breadcrumb(locale, name, '/privacy')]
  );
}

export function buildProjectSchema(locale: UrlLocale, project: Project): SchemaNode {
  const contentLocale = language(locale);
  const path = `/projects/${project.slug}`;
  const url = pageUrl(locale, path);
  return pageGraph(
    locale,
    {
      '@type': 'Article',
      '@id': `${url}#article`,
      headline: project.title,
      description: text(project.summary, contentLocale),
      url,
      inLanguage: contentLocale,
      datePublished: project.publishedAt,
      ...(project.updatedAt ? { dateModified: project.updatedAt } : {}),
      author: { '@id': `${site.canonicalOrigin}/#person` },
      image: project.images.map((image) => ({
        '@type': 'ImageObject',
        url: image.url,
        width: image.width,
        height: image.height,
        caption: text(image.alt, contentLocale)
      })),
      about: {
        '@type': project.subjectType,
        name: project.title,
        url: project.actions.find((action) => action.label === 'live-preview')?.url
      },
      breadcrumb: { '@id': `${url}#breadcrumb` },
      mainEntityOfPage: { '@id': `${url}#webpage` }
    },
    [
      {
        '@type': 'WebPage',
        '@id': `${url}#webpage`,
        url,
        name: project.title,
        breadcrumb: { '@id': `${url}#breadcrumb` }
      },
      projectBreadcrumb(locale, project)
    ]
  );
}
