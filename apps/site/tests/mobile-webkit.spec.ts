import { expect, test } from '@playwright/test';

test('mobile WebKit renders local icons and core navigation controls', async ({ page }) => {
  await page.goto('/en');

  const menuButton = page.getByRole('button', { name: 'Open menu' });
  await expect(menuButton.locator('path[d]')).toBeVisible();
  await menuButton.click();
  await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();

  const themeButton = page.getByRole('button', { name: /Theme:/ });
  await expect(themeButton.locator('path[d]')).toBeVisible();
  await themeButton.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.getByLabel('Language').selectOption('zh-tw');
  await expect(page).toHaveURL(/\/zh-tw\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('打造真正好用的網站');
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    await page.evaluate(() => window.innerWidth)
  );
});

test('mobile WebKit supports credential and external project controls', async ({ page }) => {
  await page.goto('/en/about');
  const card = page.locator('.credential-card').filter({ hasText: 'Full Stack Open' });
  const markdownCredentialLink = card.locator('.credential-markdown-link');
  await expect(markdownCredentialLink).toBeHidden();
  await expect(markdownCredentialLink).toHaveAttribute(
    'href',
    'https://cdn.mengche.dev/certificates/full-stack-open.webp'
  );
  await card.getByRole('button', { name: 'View credential' }).click();
  const dialog = page.getByRole('dialog', { name: 'Full Stack Open' });
  await expect(dialog).toBeVisible();
  await expect(dialog.locator('img')).toHaveAttribute('width', '1528');
  await expect(dialog.getByRole('button', { name: 'Close credential' }).locator('path[d]')).toBeVisible();
  await dialog.getByRole('button', { name: 'Close credential' }).click();

  await page.goto('/en/projects/evosnake');
  await expect(page.getByRole('link', { name: 'View repository' }).locator('path[d]')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Open project' }).locator('path[d]')).toBeVisible();
  await expect(page.locator('.project-gallery img')).toHaveCount(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    await page.evaluate(() => window.innerWidth)
  );
});
