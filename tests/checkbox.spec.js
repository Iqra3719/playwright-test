import { test, expect } from '@playwright/test';

test('checkbox test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/checkboxes');
  const checkbox1 = page.locator('input[type="checkbox"]').first();
  const checkbox2 = page.locator('input[type="checkbox"]').nth(1);
  
  await checkbox1.check();
  await page.waitForTimeout(2000); // <-- Ye line add ki: 2 sec rukega taake tum tick dekh sako
  
  await checkbox2.uncheck();
  await page.waitForTimeout(2000); // <-- Ye line add ki: 2 sec rukega
  
  await expect(checkbox1).toBeChecked();
  await expect(checkbox2).not.toBeChecked();
});