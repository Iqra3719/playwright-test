import { test, expect } from '@playwright/test';

test('signup test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.waitForTimeout(2000);
  await expect(page.locator('#username')).toHaveValue('tomsmith');
}); 