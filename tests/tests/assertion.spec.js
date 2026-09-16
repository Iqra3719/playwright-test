import { test, expect } from '@playwright/test';

test('all assertions practice', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  // 1. URL check
  await expect(page).toHaveURL(/.*login/);

  // 2. Title / Heading check
  await expect(page.getByRole('heading', { name: 'Login Page' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Login Page' })).toHaveText('Login Page');

  // 3. Input value check
  const username = page.locator('#username');
  await username.fill('tomsmith');
  await expect(username).toHaveValue('tomsmith');

  // 4. Button visible / enabled check
  const loginBtn = page.locator('button[type="submit"]');
  await expect(loginBtn).toBeVisible();
  await expect(loginBtn).toBeEnabled();
  await expect(loginBtn).toHaveText(' Login');

  // 5. Placeholder / attribute check
  await expect(username).toHaveAttribute('name', 'username');
});