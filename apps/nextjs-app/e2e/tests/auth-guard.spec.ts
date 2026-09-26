import { expect, test } from '@playwright/test';

/**
 * L3 e2e: verifies the middleware route guard for cookie-based auth.
 * An unauthenticated visitor hitting a protected /edu/* or /app/* route must be
 * redirected to /edu/login (the session is an HttpOnly cookie, never JS-read).
 */
test.describe('auth route guard (cookie-based)', () => {
  test('redirects unauthenticated users from /edu/dashboard to /edu/login', async ({
    page,
  }) => {
    // Start from a clean context (no session cookie).
    await page.context().clearCookies();

    await page.goto('/edu/dashboard');

    await page.waitForURL(/\/edu\/login/);
    expect(page.url()).toContain('/edu/login');
  });

  test('authenticated users (from setup storage) can reach /edu/dashboard', async ({
    page,
  }) => {
    await page.goto('/edu/dashboard');
    await page.waitForURL(/\/edu\/dashboard/);
    expect(page.url()).toContain('/edu/dashboard');
  });

  test('redirects unauthenticated users from /app to /edu/login', async ({
    page,
  }) => {
    await page.context().clearCookies();
    await page.goto('/app');
    await page.waitForURL(/\/edu\/login/);
    expect(page.url()).toContain('/edu/login');
  });

  test('authenticated users can reach /app', async ({ page }) => {
    await page.goto('/app');
    await page.waitForURL(/\/app/);
    expect(page.url()).toContain('/app');
  });

  test('en locale: /en/edu/dashboard also guarded', async ({ page }) => {
    await page.context().clearCookies();
    await page.goto('/en/edu/dashboard');
    await page.waitForURL(/\/edu\/login/);
    expect(page.url()).toContain('/edu/login');
  });
});
