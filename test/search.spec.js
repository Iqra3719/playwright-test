const { test, expect } = require('@playwright/test');

test('Ahmed institute search karta hai', async ({ page }) => {
  await page.goto('https://www.google.com');
  await page.locator('textarea[name="q"]').fill('Ahmed institute');
  await page.keyboard.press('Enter');
  await page.waitForTimeout(3000);
  await expect(page.locator('body')).toContainText(/Ahmed/i);
});