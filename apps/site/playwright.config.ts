import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: 'https://127.0.0.1:4173',
    ignoreHTTPSErrors: true,
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: '**/mobile-webkit.spec.ts',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'mobile-webkit',
      testMatch: '**/mobile-webkit.spec.ts',
      use: { ...devices['iPhone 13'] }
    }
  ],
  webServer: {
    command: 'pnpm build && pnpm exec wrangler dev --local --local-protocol https --port 4173',
    env: {
      PUBLIC_TURNSTILE_SITE_KEY: '1x00000000000000000000AA',
      PUBLIC_CONTACT_API_ORIGIN: 'https://127.0.0.1:4173',
      PUBLIC_CF_ANALYTICS_TOKEN: ''
    },
    url: 'https://127.0.0.1:4173/en',
    ignoreHTTPSErrors: true,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000
  }
});
