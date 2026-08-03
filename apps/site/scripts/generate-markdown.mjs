import { promises as fs } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const VOID_TAGS = new Set([
  'area',
  'base',
  'br',
  'col',
  'embed',
  'hr',
  'img',
  'input',
  'link',
  'meta',
  'param',
  'source',
  'track',
  'wbr'
]);

const OMIT_TAGS = new Set([
  'button',
  'dialog',
  'input',
  'noscript',
  'option',
  'path',
  'script',
  'select',
  'style',
  'svg',
  'template',
  'textarea'
]);

const BLOCK_TAGS = new Set(['article', 'aside', 'div', 'figure', 'form', 'header', 'main', 'section']);

function decodeHtml(value) {
  return value.replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (entity, name) => {
    const normalized = name.toLowerCase();
    if (normalized.startsWith('#x')) {
      return String.fromCodePoint(Number.parseInt(normalized.slice(2), 16));
    }
    if (normalized.startsWith('#')) {
      return String.fromCodePoint(Number.parseInt(normalized.slice(1), 10));
    }

    return (
      {
        amp: '&',
        apos: "'",
        gt: '>',
        lt: '<',
        nbsp: ' ',
        quot: '"'
      }[normalized] ?? entity
    );
  });
}

function parseAttributes(tagSource) {
  const attributes = {};
  const opening = tagSource.match(/^<\/?[^\s/>]+/);
  if (!opening) return attributes;

  const source = tagSource.slice(opening[0].length, tagSource.length - (tagSource.endsWith('/>') ? 2 : 1));
  const pattern = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+)))?/g;

  for (const match of source.matchAll(pattern)) {
    const [, name, doubleQuoted, singleQuoted, unquoted] = match;
    attributes[name.toLowerCase()] = decodeHtml(doubleQuoted ?? singleQuoted ?? unquoted ?? '');
  }

  return attributes;
}

function extractMetadata(html) {
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const htmlMatch = html.match(/<html\b[^>]*>/i);
  const htmlAttributes = htmlMatch ? parseAttributes(htmlMatch[0]) : {};
  let description = '';
  let canonical = '';

  for (const tag of html.matchAll(/<(?:meta|link)\b[^>]*>/gi)) {
    const attributes = parseAttributes(tag[0]);
    if (attributes.name?.toLowerCase() === 'description') description = attributes.content ?? '';
    if (attributes.rel?.toLowerCase() === 'canonical') canonical = attributes.href ?? '';
  }

  return {
    title: decodeHtml(titleMatch?.[1]?.replace(/<[^>]+>/g, '') ?? '').trim(),
    description,
    canonical,
    lang: htmlAttributes.lang ?? ''
  };
}

function parseFragment(html) {
  const root = { tag: null, attrs: {}, children: [] };
  const stack = [root];
  const tokens = html.match(/<!--[\s\S]*?-->|<![^>]*>|<\/?[A-Za-z][^>]*>|[^<]+|</g) ?? [];

  for (const token of tokens) {
    if (token.startsWith('<!--') || token.startsWith('<!')) continue;

    if (token.startsWith('</')) {
      const tag = token
        .slice(2)
        .match(/^[^\s>]+/)?.[0]
        ?.toLowerCase();
      if (!tag) continue;

      for (let index = stack.length - 1; index > 0; index -= 1) {
        if (stack[index].tag === tag) {
          stack.length = index;
          break;
        }
      }
      continue;
    }

    if (token.startsWith('<') && token !== '<') {
      const tag = token
        .slice(1)
        .match(/^[^\s/>]+/)?.[0]
        ?.toLowerCase();
      if (!tag) continue;

      const node = { tag, attrs: parseAttributes(token), children: [] };
      stack.at(-1).children.push(node);
      if (!VOID_TAGS.has(tag) && !token.endsWith('/>')) stack.push(node);
      continue;
    }

    stack.at(-1).children.push({ text: decodeHtml(token) });
  }

  return root;
}

function normalizeInline(value) {
  return value.replace(/[\t\r\n ]+/g, ' ').trim();
}

function escapeMarkdownText(value) {
  return value.replace(/([\\`*_[\]])/g, '\\$1');
}

function resolveReference(value, baseUrl) {
  if (!value || !baseUrl) return value;
  try {
    return new URL(value, baseUrl).toString();
  } catch {
    return value;
  }
}

function renderTable(node, context) {
  const rows = [];

  const visit = (current) => {
    if ('text' in current || OMIT_TAGS.has(current.tag)) return;
    if (current.tag === 'tr') {
      const cells = current.children
        .filter((child) => !('text' in child) && (child.tag === 'th' || child.tag === 'td'))
        .map((cell) => normalizeInline(renderChildren(cell, context)).replace(/\|/g, '\\|'));
      if (cells.length > 0) rows.push(cells);
      return;
    }
    for (const child of current.children) visit(child);
  };

  visit(node);
  if (rows.length === 0) return '';

  const columnCount = Math.max(...rows.map((row) => row.length));
  const normalizedRows = rows.map((row) => [...row, ...Array(columnCount - row.length).fill('')]);
  const [header, ...body] = normalizedRows;
  const separator = Array(columnCount).fill('---');
  const lines = [header, separator, ...body].map((row) => `| ${row.join(' | ')} |`);
  return `\n\n${lines.join('\n')}\n\n`;
}

function renderList(node, context, ordered) {
  const items = node.children.filter((child) => !('text' in child) && child.tag === 'li');
  if (items.length === 0) return '';

  const lines = items.map((item, index) => {
    const content = normalizeInline(renderChildren(item, { ...context, inList: true }));
    const marker = ordered ? `${index + 1}.` : '-';
    return `${marker} ${content}`;
  });

  return `\n\n${lines.join('\n')}\n\n`;
}

function renderDefinitionList(node, context) {
  const lines = [];
  let term = '';

  for (const child of node.children) {
    if ('text' in child) continue;
    if (child.tag === 'dt') {
      term = normalizeInline(renderChildren(child, context));
      continue;
    }
    if (child.tag === 'dd') {
      const description = normalizeInline(renderChildren(child, context));
      if (term && description) lines.push(`- **${term}:** ${description}`);
      else if (description) lines.push(`- ${description}`);
      term = '';
    }
  }

  return lines.length > 0 ? `\n\n${lines.join('\n')}\n\n` : '';
}

function renderChildren(node, context) {
  return node.children.map((child) => renderNode(child, context)).join('');
}

function renderNode(node, context) {
  if ('text' in node) return context.preformatted ? node.text : node.text.replace(/[\t\r\n ]+/g, ' ');
  const classes = new Set((node.attrs.class ?? '').split(/\s+/).filter(Boolean));
  if (OMIT_TAGS.has(node.tag) || node.attrs['aria-hidden'] === 'true' || classes.has('service-index')) {
    return '';
  }

  const children = () => renderChildren(node, context);

  if (/^h[1-6]$/.test(node.tag)) {
    const level = Number(node.tag[1]);
    const content = normalizeInline(children());
    return content ? `\n\n${'#'.repeat(level)} ${content}\n\n` : '';
  }

  switch (node.tag) {
    case 'p': {
      const content = normalizeInline(children());
      return content ? `\n\n${content}\n\n` : '';
    }
    case 'a': {
      const label = normalizeInline(children()) || node.attrs['aria-label'] || node.attrs.title || '';
      const href = resolveReference(node.attrs.href ?? '', context.baseUrl);
      if (!label) return '';
      return href ? `[${label}](${href}) ` : label;
    }
    case 'img': {
      const alt = normalizeInline(node.attrs.alt ?? '');
      const src = resolveReference(node.attrs.src ?? '', context.baseUrl);
      return alt && src ? `\n\n![${escapeMarkdownText(alt)}](${src})\n\n` : '';
    }
    case 'strong':
    case 'b': {
      const content = normalizeInline(children());
      return content ? `**${content}**` : '';
    }
    case 'em':
    case 'i': {
      const content = normalizeInline(children());
      return content ? `*${content}*` : '';
    }
    case 'code': {
      const content = normalizeInline(children());
      return content ? `\`${content.replace(/`/g, '\\`')}\`` : '';
    }
    case 'pre': {
      const content = renderChildren(node, { ...context, preformatted: true }).trim();
      return content ? `\n\n\`\`\`\n${content}\n\`\`\`\n\n` : '';
    }
    case 'blockquote': {
      const content = normalizeMarkdown(children());
      return content
        ? `\n\n${content
            .split('\n')
            .map((line) => `> ${line}`)
            .join('\n')}\n\n`
        : '';
    }
    case 'br':
      return '\n';
    case 'hr':
      return '\n\n---\n\n';
    case 'ul':
      return renderList(node, context, false);
    case 'ol':
      return renderList(node, context, true);
    case 'dl':
      return renderDefinitionList(node, context);
    case 'table':
      return renderTable(node, context);
    default: {
      const content = children();
      if (!content.trim()) return '';
      return BLOCK_TAGS.has(node.tag) && !context.inList ? `\n\n${content.trim()}\n\n` : content;
    }
  }
}

function normalizeMarkdown(value) {
  return value
    .replace(/[ \t]{2,}/g, ' ')
    .replace(/[ \t]+\n/g, '\n')
    .replace(/\n[ \t]+/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function yamlString(value) {
  return JSON.stringify(value);
}

export function htmlToMarkdownDocument(html) {
  const metadata = extractMetadata(html);
  const mainMatch = html.match(/<main\b[^>]*\bid=(?:"main-content"|'main-content')[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) throw new Error('Expected <main id="main-content"> in prerendered page');

  const tree = parseFragment(mainMatch[1]);
  const markdown = normalizeMarkdown(renderChildren(tree, { baseUrl: metadata.canonical, inList: false }));
  const frontmatter = [
    '---',
    `title: ${yamlString(metadata.title)}`,
    ...(metadata.description ? [`description: ${yamlString(metadata.description)}`] : []),
    ...(metadata.canonical ? [`canonical: ${yamlString(metadata.canonical)}`] : []),
    ...(metadata.lang ? [`lang: ${yamlString(metadata.lang)}`] : []),
    '---'
  ].join('\n');

  return `${frontmatter}\n\n${markdown}\n`;
}

export function markdownPathForHtml(htmlPath) {
  return htmlPath.replace(/\.html$/i, '.md');
}

async function findHtmlFiles(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await findHtmlFiles(entryPath)));
    else if (entry.isFile() && entry.name.endsWith('.html') && entry.name !== '404.html')
      files.push(entryPath);
  }

  return files;
}

export async function generateMarkdown(buildDirectory) {
  const htmlFiles = await findHtmlFiles(buildDirectory);

  await Promise.all(
    htmlFiles.map(async (htmlPath) => {
      const html = await fs.readFile(htmlPath, 'utf8');
      const markdown = htmlToMarkdownDocument(html);
      await fs.writeFile(markdownPathForHtml(htmlPath), markdown, 'utf8');
    })
  );

  return htmlFiles.length;
}

const currentFile = fileURLToPath(import.meta.url);
if (process.argv[1] && path.resolve(process.argv[1]) === currentFile) {
  const buildDirectory = path.resolve(path.dirname(currentFile), '..', 'build');
  const count = await generateMarkdown(buildDirectory);
  console.log(`Generated ${count} Markdown page${count === 1 ? '' : 's'}.`);
}
