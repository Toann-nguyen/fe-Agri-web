import { test, expect } from '@playwright/test';

test('profile', async ({ page }) => {
  // update user:
  await page.goto('/app');
  await page.getByRole('button', { name: 'Open user menu' }).click();
  await page.getByRole('menuitem', { name: 'Your Profile' }).click();
  await page.getByRole('button', { name: 'Update Profile' }).click();
  await page.getByLabel('First Name').fill('Jane');
  await page.getByLabel('Last Name').fill('Doe');
  await page.getByLabel('Bio').click();
  await page.getByLabel('Bio').fill('My bio');
  await page.getByRole('button', { name: 'Submit' }).click();

  // drawer auto-closes on success and a toast confirms the update
  await expect(page.getByText('Profile Updated')).toBeVisible();
  await expect(page.getByText('My bio')).toBeVisible();
});
