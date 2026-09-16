import { test, expect } from '@playwright/test';

test('hover test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/hovers');
  const avatar = page.locator('.figure').first();
  
  await avatar.hover();
  await page.waitForTimeout(2000);
  
  const name = page.locator('.figcaption h5').first();
  await expect(name).toHaveText('name: user1');
});