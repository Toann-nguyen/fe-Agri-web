import { test as setup, expect } from '@playwright/test';
import { createUser } from '../../src/testing/data-generators';

const authFile = 'e2e/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const user = createUser();

  await page.goto('/');
  await page.getByRole('link', { name: 'Open Terminal' }).click();
  await page.waitForURL('/edu/login');

  // sign up:
  await page.getByRole('link', { name: 'Đăng ký ngay' }).click();
  await page.waitForURL('/auth/register');

  await page.getByLabel('Full Name').click();
  await page.getByLabel('Full Name').fill(user.name);
  await page.getByLabel('Email Address').click();
  await page.getByLabel('Email Address').fill(user.email);
  await page.getByLabel('Password', { exact: true }).click();
  await page.getByLabel('Password', { exact: true }).fill(user.password);
  await page.getByLabel('Confirm Password').click();
  await page.getByLabel('Confirm Password').fill(user.password);
  await page.getByRole('button', { name: 'Sign up' }).click();
  await page.getByRole('link', { name: 'Back to sign in' }).click();
  await page.waitForURL('/edu/login');

  // log in via the edu portal:
  await page.getByLabel('Tên đăng nhập hoặc Email').click();
  await page.getByLabel('Tên đăng nhập hoặc Email').fill(user.email);
  await page.getByLabel('Mật khẩu').click();
  await page.getByLabel('Mật khẩu').fill(user.password);
  await page.getByRole('button', { name: 'Đăng Nhập Edu-AI-VN' }).click();
  await page.waitForURL('/edu/dashboard');

  await page.context().storageState({ path: authFile });
});
