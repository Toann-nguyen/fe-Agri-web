import { expect, test } from '@playwright/test';

/**
 * L3 e2e: verifies the middleware route guard for cookie-based auth.
 * An unauthenticated visitor hitting a protected /edu/* route must be
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
});
