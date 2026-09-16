import { test, expect } from '@playwright/test';

test('browser navigation test', async ({ page }) => {
  // 1. Pehla page open
  await page.goto('https://the-internet.herokuapp.com/');
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/');

  // 2. Dusre page par jao
  await page.getByRole('link', { name: 'A/B Testing' }).click();
  await expect(page).toHaveURL(/.*abtest/);
  await page.waitForTimeout(1000);

  // 3. Back jao (wapas homepage)
  await page.goBack();
  await expect(page).toHaveURL('https://the-internet.herokuapp.com/');
  await page.waitForTimeout(1000);

  // 4. Forward jao (phir se A/B Testing)
  await page.goForward();
  await expect(page).toHaveURL(/.*abtest/);
  await page.waitForTimeout(1000);

  // 5. Page Reload
  await page.reload();
  await expect(page.getByRole('heading')).toBeVisible();
});