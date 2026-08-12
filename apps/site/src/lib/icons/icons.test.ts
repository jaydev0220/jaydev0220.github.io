import { render } from 'svelte/server';
import { describe, expect, it } from 'vitest';
import BrandDiscordFilled from './BrandDiscordFilled.svelte';
import BrandFacebookFilled from './BrandFacebookFilled.svelte';
import BrandGithub from './BrandGithub.svelte';
import BrandLinkedinFilled from './BrandLinkedinFilled.svelte';
import BrightnessAutoFilled from './BrightnessAutoFilled.svelte';
import ExternalLink from './ExternalLink.svelte';
import FolderOpen from './FolderOpen.svelte';
import Menu2 from './Menu2.svelte';
import Moon from './Moon.svelte';
import SunHigh from './SunHigh.svelte';
import X from './X.svelte';

const icons = [
  BrandDiscordFilled,
  BrandFacebookFilled,
  BrandGithub,
  BrandLinkedinFilled,
  BrightnessAutoFilled,
  ExternalLink,
  FolderOpen,
  Menu2,
  Moon,
  SunHigh,
  X
];

describe('local Tabler icons', () => {
  it.each(icons)('renders SVG geometry in a d attribute', (Icon) => {
    const { body } = render(Icon, { props: { 'aria-hidden': 'true' } });

    expect(body).toMatch(/<svg[^>]*viewBox="0 0 24 24"/);
    expect(body).toMatch(/<path d="[^"]+"><\/path>/);
    expect(body).not.toMatch(/<path class=/);
  });
});
