import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const iconFiles = [
  'BrandDiscordFilled.svelte',
  'BrandFacebookFilled.svelte',
  'BrandGithub.svelte',
  'BrandLinkedinFilled.svelte',
  'BrightnessAutoFilled.svelte',
  'ExternalLink.svelte',
  'FolderOpen.svelte',
  'Menu2.svelte',
  'Moon.svelte',
  'SunHigh.svelte',
  'X.svelte'
];

const source = (file: string) => readFile(fileURLToPath(new URL(file, import.meta.url)), 'utf8');

describe('local Tabler icons', () => {
  it('renders shared path data as a real SVG d attribute', async () => {
    const component = await source('TablerIcon.svelte');
    expect(component).toContain('viewBox="0 0 24 24"');
    expect(component).toContain('<path d={pathData} />');
    expect(component).not.toContain('d: path(');
  });

  it.each(iconFiles)('%s defines local SVG geometry', async (file) => {
    const component = await source(file);
    expect(component).toMatch(/pathData="[^"]+"/);
    expect(component).not.toContain('@iconify');
  });
});
