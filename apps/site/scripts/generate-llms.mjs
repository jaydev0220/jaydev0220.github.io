import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_ORIGIN = 'https://www.mengche.dev';

const LOCALES = {
  en: {
    section: 'English',
    summary:
      'MengChe Dev is Jay Hsieh’s web development portfolio and commission site, covering services, projects, background, and project case studies.'
  },
  'zh-tw': {
    section: 'Traditional Chinese',
    summary: 'MengChe Dev 是謝孟哲的網站開發作品集與專案委託網站，包含服務、專案、個人背景與專案案例。'
  }
};

const CORE_FILES = ['', 'services', 'projects', 'about'];
const OPTIONAL_FILES = ['contact', 'privacy'];

function parseFrontmatter(markdown) {
  const match = markdown.match(/^---\n([\s\S]*?)\n---\n/);
  if (!match) return {};

  const metadata = {};
  for (const line of match[1].split('\n')) {
    const separator = line.indexOf(':');
    if (separator === -1) continue;

    const key = line.slice(0, separator).trim();
    const rawValue = line.slice(separator + 1).trim();
    try {
      metadata[key] = JSON.parse(rawValue);
    } catch {
      metadata[key] = rawValue;
    }
  }

  return metadata;
}

function parseMarkdownResource(markdown, publicPath) {
  const metadata = parseFrontmatter(markdown);
  const heading = markdown.match(/^#\s+(.+)$/m)?.[1]?.trim();
  const title = heading || metadata.title || publicPath;
  const description = metadata.description?.trim?.() || '';

  return {
    title,
    description,
    url: new URL(publicPath, `${SITE_ORIGIN}/`).toString()
  };
}

function formatResource(resource, suffix = '') {
  const title = suffix ? `${resource.title} (${suffix})` : resource.title;
  const note = resource.description ? `: ${resource.description}` : '';
  return `- [${title}](${resource.url})${note}`;
}

async function readResource(buildDirectory, locale, relativePath) {
  const filePath = relativePath
    ? path.join(buildDirectory, locale, `${relativePath}.md`)
    : path.join(buildDirectory, `${locale}.md`);
  const publicPath = relativePath ? `/${locale}/${relativePath}.md` : `/${locale}.md`;
  const markdown = await fs.readFile(filePath, 'utf8');
  return parseMarkdownResource(markdown, publicPath);
}

async function readProjectResources(buildDirectory, locale) {
  const projectDirectory = path.join(buildDirectory, locale, 'projects');
  const entries = await fs.readdir(projectDirectory, { withFileTypes: true });
  const markdownFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.md'))
    .map((entry) => entry.name)
    .sort((left, right) => left.localeCompare(right));

  return Promise.all(
    markdownFiles.map(async (fileName) => {
      const markdown = await fs.readFile(path.join(projectDirectory, fileName), 'utf8');
      return parseMarkdownResource(markdown, `/${locale}/projects/${fileName}`);
    })
  );
}

async function collectLocaleResources(buildDirectory, locale) {
  const core = await Promise.all(
    CORE_FILES.map((relativePath) => readResource(buildDirectory, locale, relativePath))
  );
  const projects = await readProjectResources(buildDirectory, locale);
  const optional = await Promise.all(
    OPTIONAL_FILES.map((relativePath) => readResource(buildDirectory, locale, relativePath))
  );

  return { core: [...core, ...projects], optional };
}

export function renderLocalizedLlms(locale, resources) {
  const config = LOCALES[locale];
  if (!config) throw new Error(`Unsupported locale: ${locale}`);

  return [
    '# MengChe Dev',
    '',
    `> ${config.summary}`,
    '',
    `## ${config.section}`,
    '',
    ...resources.core.map((resource) => formatResource(resource)),
    '',
    '## Optional',
    '',
    ...resources.optional.map((resource) => formatResource(resource)),
    ''
  ].join('\n');
}

export function renderCombinedLlms(resourcesByLocale) {
  const english = resourcesByLocale.en;
  const traditionalChinese = resourcesByLocale['zh-tw'];

  return [
    '# MengChe Dev',
    '',
    '> MengChe Dev is a bilingual web development portfolio and commission site by Jay Hsieh (謝孟哲), with English and Traditional Chinese content.',
    '',
    '## English',
    '',
    ...english.core.map((resource) => formatResource(resource)),
    '',
    '## Traditional Chinese',
    '',
    ...traditionalChinese.core.map((resource) => formatResource(resource)),
    '',
    '## Optional',
    '',
    ...english.optional.map((resource) => formatResource(resource, 'English')),
    ...traditionalChinese.optional.map((resource) => formatResource(resource, 'Traditional Chinese')),
    ''
  ].join('\n');
}

export async function generateLlms(buildDirectory) {
  const resourcesByLocale = Object.fromEntries(
    await Promise.all(
      Object.keys(LOCALES).map(async (locale) => [
        locale,
        await collectLocaleResources(buildDirectory, locale)
      ])
    )
  );

  await Promise.all([
    fs.writeFile(path.join(buildDirectory, 'llms.txt'), renderCombinedLlms(resourcesByLocale), 'utf8'),
    ...Object.keys(LOCALES).map((locale) =>
      fs.writeFile(
        path.join(buildDirectory, locale, 'llms.txt'),
        renderLocalizedLlms(locale, resourcesByLocale[locale]),
        'utf8'
      )
    )
  ]);

  return Object.keys(LOCALES).length + 1;
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  const buildDirectory = path.resolve(path.dirname(currentFile), '..', 'build');
  const count = await generateLlms(buildDirectory);
  console.log(`Generated ${count} llms.txt files.`);
}
