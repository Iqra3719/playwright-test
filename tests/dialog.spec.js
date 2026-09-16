const { test, expect } = require('@playwright/test');

test('dialog handling', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/javascript_alerts');

  // 1. dialog.message() + accept()
  page.once('dialog', async dialog => {
    console.log('Message:', dialog.message());
    console.log('Type:', dialog.type());
    await dialog.accept(); // OK dabana
  });
  await page.click('button:has-text("Click for JS Alert")');
  await page.waitForTimeout(1500);

  // 2. dialog.dismiss() - Cancel dabana
  page.once('dialog', async dialog => {
    await dialog.dismiss();
  });
  await page.click('button:has-text("Click for JS Confirm")');
  await page.waitForTimeout(1500);

  // 3. prompt me text bhejna
  page.once('dialog', async dialog => {
    await dialog.accept('Hello Sir'); // prompt me text
  });
  await page.click('button:has-text("Click for JS Prompt")');
  await page.waitForTimeout(1500);
});