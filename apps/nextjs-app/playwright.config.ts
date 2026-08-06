import { defineConfig, devices } from '@playwright/test';

const PORT = 3000;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    // baseURL: 'http://127.0.0.1:3000',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      testMatch: /.*\.spec\.ts/,
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'e2e/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: {
    command: `pnpm dev --port ${PORT}`,
    timeout: 120 * 1000,
    port: PORT,
    reuseExistingServer: !process.env.CI,
    /* These env vars are passed to the spawned dev server. They take
       precedence over any .env/.env.local, so e2e always targets the local
       mock server regardless of local config. */
    env: {
      NEXT_PUBLIC_API_URL: 'http://localhost:8080/api',
      NEXT_PUBLIC_URL: 'http://localhost:3000',
      NEXT_PUBLIC_ENABLE_API_MOCKING: 'false',
      NEXT_PUBLIC_MOCK_API_PORT: '8080',
    },
  },
});
