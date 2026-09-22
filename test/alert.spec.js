import { test, expect } from '@playwright/test';

test('alert test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');
  
  page.on('dialog', async dialog => {
    await page.waitForTimeout(1000);
    await dialog.accept();
  });
  
  await page.locator('button[onclick="jsAlert()"]').click();
  await page.waitForTimeout(2000);
  await expect(page.locator('#result')).toHaveText('You successfully clicked an alert');
});