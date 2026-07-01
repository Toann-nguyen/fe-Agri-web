import { test as setup, expect } from '@playwright/test';
import { createUser } from '../../src/testing/data-generators';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const user = createUser();

  await page.goto('/');
  await page.getByRole('button', { name: 'Get started' }).click();
  await page.waitForURL('/auth/login');
  await page.getByRole('link', { name: 'Register' }).click();

  // registration:
  await page.getByLabel('Full Name').click();
  await page.getByLabel('Full Name').fill(user.name);
  await page.getByLabel('Email Address').click();
  await page.getByLabel('Email Address').fill(user.email);
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill(user.password);
  await page.getByLabel('Confirm Password').click();
  await page.getByLabel('Confirm Password').fill(user.password);
  await page.getByRole('button', { name: 'Register' }).click();
  await page.waitForURL('/app');

  // log out:
  await page.getByRole('button', { name: 'Open user menu' }).click();
  await page.getByRole('menuitem', { name: 'Sign Out' }).click();
  await page.waitForURL('/auth/login?redirectTo=%2Fapp');

  // log in:
  await page.getByLabel('Email Address').click();
  await page.getByLabel('Email Address').fill(user.email);
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill(user.password);
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.waitForURL('/app');

  await page.context().storageState({ path: authFile });
});
