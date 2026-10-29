import { test, expect } from '../../fixtures';

test.use({ storageState: { cookies: [], origins: [] } });

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => { await loginPage.goto(); });

  test('valid user lands on inventory', async ({ loginPage, page }) => {
    await loginPage.login('standard_user', 'secret_sauce');
    await expect(page).toHaveURL(/inventory\.html/);
  });

  test('locked out user sees error', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', 'secret_sauce');
    await expect(loginPage.error).toContainText('locked out');
  });

  test('wrong password sees error', async ({ loginPage }) => {
    await loginPage.login('standard_user', 'wrong');
    await expect(loginPage.error).toContainText('do not match');
  });
});
