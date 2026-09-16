import { test, expect } from '@playwright/test';

test('screenshot test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');

  // 1. Full page ka screenshot
  await page.screenshot({ path: 'full-page.png', fullPage: true });

  // 2. Sirf ek element ka screenshot (login form)
  const form = page.locator('#login');
  await form.screenshot({ path: 'login-form.png' });

  // 3. Login karke visual check
  await page.locator('#username').fill('tomsmith');
  await page.locator('#password').fill('SuperSecretPassword!');
  await page.locator('button[type="submit"]').click();

  // Verify ke screenshot ke baad page sahi hai
  await expect(page).toHaveURL(/.*secure/);
  await page.screenshot({ path: 'after-login.png' });
});