import { test, expect } from '@playwright/test';

test('input test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/inputs');
  const input = page.locator('input[type="number"]');
  
  await input.fill('12345');
  await page.waitForTimeout(2000);
  await expect(input).toHaveValue('12345');
  
  await input.fill('999');
  await page.waitForTimeout(2000);
  await expect(input).toHaveValue('999');
}); 