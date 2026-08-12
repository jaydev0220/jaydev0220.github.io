import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  testMatch: '**/dev-smoke.spec.ts',
  fullyParallel: false,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    ...devices['Desktop Chrome'],
    baseURL: 'http://127.0.0.1:4174'
  },
  webServer: {
    command: 'pnpm dev --host 127.0.0.1 --port 4174',
    env: {
      PUBLIC_TURNSTILE_SITE_KEY: '1x00000000000000000000AA',
      PUBLIC_CONTACT_API_ORIGIN: 'http://127.0.0.1:8787',
      PUBLIC_CF_ANALYTICS_TOKEN: ''
    },
    url: 'http://127.0.0.1:4174/en',
    reuseExistingServer: false,
    timeout: 120_000
  }
});
