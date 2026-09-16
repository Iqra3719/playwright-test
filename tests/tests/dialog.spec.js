import { test, expect } from '@playwright/test';

test('dialog prompt test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // Dialog ko handle karne ke liye listener lagana zaroori hai
  page.on('dialog', async dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    await dialog.accept('Hello Playwright');
  });

  await page.getByRole('button', { name: 'Click for JS Prompt' }).click();
  await expect(page.locator('#result')).toHaveText('You entered: Hello Playwright');
});