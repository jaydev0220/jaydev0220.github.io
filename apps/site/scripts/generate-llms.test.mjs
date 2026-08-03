import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { generateLlms } from './generate-llms.mjs';

const temporaryDirectories = [];

function markdownDocument({ title, description, canonical, lang }) {
  return `---
title: ${JSON.stringify(`${title} — MengChe Dev`)}
description: ${JSON.stringify(description)}
canonical: ${JSON.stringify(canonical)}
lang: ${JSON.stringify(lang)}
---

# ${title}

Page content.
`;
}

async function writeLocale(buildDirectory, locale, pages, projects) {
  await fs.mkdir(path.join(buildDirectory, locale, 'projects'), { recursive: true });

  for (const [relativePath, page] of Object.entries(pages)) {
    const filePath = relativePath
      ? path.join(buildDirectory, locale, `${relativePath}.md`)
      : path.join(buildDirectory, `${locale}.md`);
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, markdownDocument(page), 'utf8');
  }

  for (const [slug, project] of Object.entries(projects)) {
    await fs.writeFile(
      path.join(buildDirectory, locale, 'projects', `${slug}.md`),
      markdownDocument(project),
      'utf8'
    );
  }
}

afterEach(async () => {
  await Promise.all(temporaryDirectories.splice(0).map((directory) => fs.rm(directory, { recursive: true })));
});

describe('llms.txt generation', () => {
  it('generates combined and localized indexes from built Markdown resources', async () => {
    const buildDirectory = await fs.mkdtemp(path.join(os.tmpdir(), 'mengche-llms-'));
    temporaryDirectories.push(buildDirectory);

    await writeLocale(
      buildDirectory,
      'en',
      {
        '': {
          title: 'Home',
          description: 'English home.',
          canonical: 'https://www.mengche.dev/en',
          lang: 'en'
        },
        services: {
          title: 'Services',
          description: 'English services.',
          canonical: 'https://www.mengche.dev/en/services',
          lang: 'en'
        },
        projects: {
          title: 'Projects',
          description: 'English projects.',
          canonical: 'https://www.mengche.dev/en/projects',
          lang: 'en'
        },
        about: {
          title: 'About',
          description: 'English about.',
          canonical: 'https://www.mengche.dev/en/about',
          lang: 'en'
        },
        contact: {
          title: 'Contact',
          description: 'English contact.',
          canonical: 'https://www.mengche.dev/en/contact',
          lang: 'en'
        },
        privacy: {
          title: 'Privacy',
          description: 'English privacy.',
          canonical: 'https://www.mengche.dev/en/privacy',
          lang: 'en'
        }
      },
      {
        'sample-project': {
          title: 'Sample Project',
          description: 'English case study.',
          canonical: 'https://www.mengche.dev/en/projects/sample-project',
          lang: 'en'
        }
      }
    );

    await writeLocale(
      buildDirectory,
      'zh-tw',
      {
        '': {
          title: '首頁',
          description: '繁體中文首頁。',
          canonical: 'https://www.mengche.dev/zh-tw',
          lang: 'zh-TW'
        },
        services: {
          title: '服務',
          description: '繁體中文服務。',
          canonical: 'https://www.mengche.dev/zh-tw/services',
          lang: 'zh-TW'
        },
        projects: {
          title: '專案',
          description: '繁體中文專案。',
          canonical: 'https://www.mengche.dev/zh-tw/projects',
          lang: 'zh-TW'
        },
        about: {
          title: '關於',
          description: '繁體中文關於。',
          canonical: 'https://www.mengche.dev/zh-tw/about',
          lang: 'zh-TW'
        },
        contact: {
          title: '聯絡',
          description: '繁體中文聯絡。',
          canonical: 'https://www.mengche.dev/zh-tw/contact',
          lang: 'zh-TW'
        },
        privacy: {
          title: '隱私權',
          description: '繁體中文隱私權。',
          canonical: 'https://www.mengche.dev/zh-tw/privacy',
          lang: 'zh-TW'
        }
      },
      {
        'sample-project': {
          title: '範例專案',
          description: '繁體中文案例。',
          canonical: 'https://www.mengche.dev/zh-tw/projects/sample-project',
          lang: 'zh-TW'
        }
      }
    );

    await expect(generateLlms(buildDirectory)).resolves.toBe(3);

    const combined = await fs.readFile(path.join(buildDirectory, 'llms.txt'), 'utf8');
    const english = await fs.readFile(path.join(buildDirectory, 'en', 'llms.txt'), 'utf8');
    const traditionalChinese = await fs.readFile(path.join(buildDirectory, 'zh-tw', 'llms.txt'), 'utf8');

    expect(combined).toContain('# MengChe Dev');
    expect(combined).toContain('## English');
    expect(combined).toContain('## Traditional Chinese');
    expect(combined).toContain(
      '- [Sample Project](https://www.mengche.dev/en/projects/sample-project.md): English case study.'
    );
    expect(combined).toContain(
      '- [範例專案](https://www.mengche.dev/zh-tw/projects/sample-project.md): 繁體中文案例。'
    );
    expect(combined).toContain('## Optional');
    expect(combined).toContain('[Contact (English)](https://www.mengche.dev/en/contact.md)');
    expect(combined).toContain('[聯絡 (Traditional Chinese)](https://www.mengche.dev/zh-tw/contact.md)');

    expect(english).toContain('## English');
    expect(english).toContain('[Home](https://www.mengche.dev/en.md)');
    expect(english).toContain('[Sample Project](https://www.mengche.dev/en/projects/sample-project.md)');
    expect(english).toContain('## Optional');
    expect(english).not.toContain('## Traditional Chinese');

    expect(traditionalChinese).toContain('## Traditional Chinese');
    expect(traditionalChinese).toContain('[首頁](https://www.mengche.dev/zh-tw.md)');
    expect(traditionalChinese).toContain(
      '[範例專案](https://www.mengche.dev/zh-tw/projects/sample-project.md)'
    );
    expect(traditionalChinese).toContain('## Optional');
    expect(traditionalChinese).not.toContain('## English');
  });
});
