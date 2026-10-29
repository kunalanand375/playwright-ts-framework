import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('username').fill(process.env.SAUCE_USER || 'standard_user');
  await page.getByTestId('password').fill(process.env.SAUCE_PASS || 'secret_sauce');
  await page.getByTestId('login-button').click();
  await expect(page).toHaveURL(/inventory\.html/);
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
