import { expect, test } from '@playwright/test';

test('Vite development hydration enables navbar controls promptly', async ({ page }) => {
  await page.goto('/en');

  const themeButton = page.getByRole('button', { name: 'Theme: System' });
  await page.waitForFunction(() => {
    const button = document.querySelector<HTMLButtonElement>('button[aria-label="Theme: System"]');
    return (
      button &&
      Reflect.ownKeys(button).some(
        (key) =>
          typeof key === 'symbol' && typeof (button as unknown as Record<symbol, unknown>)[key] === 'object'
      )
    );
  });
  await themeButton.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');

  await page.getByLabel('Language').selectOption('zh-tw');
  await expect(page).toHaveURL(/\/zh-tw\/?$/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('打造真正好用的網站');

  await page.setViewportSize({ width: 390, height: 844 });
  const menuButton = page.getByRole('button', { name: '開啟選單' });
  await page.waitForFunction(() => {
    const button = document.querySelector<HTMLButtonElement>('button[aria-label="開啟選單"]');
    return button && Reflect.ownKeys(button).some((key) => typeof key === 'symbol');
  });
  await menuButton.click();
  await expect(page.getByRole('button', { name: '關閉選單' })).toHaveAttribute('aria-expanded', 'true');
});
