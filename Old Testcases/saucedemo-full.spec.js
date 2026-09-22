import { test, expect } from '@playwright/test';

test('saucedemo full flow - long script', async ({ page }) => {
  // 1. LOGIN
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory/);
  await page.waitForTimeout(1500); 

  // 2. ADD 3 ITEMS TO CART
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.waitForTimeout(1500); 
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.waitForTimeout(1500); 
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await page.waitForTimeout(1500); 
  await expect(page.locator('.shopping_cart_badge')).toHaveText('3');

  // 3. OPEN CART AND VERIFY
  await page.locator('.shopping_cart_link').click();
  await page.waitForTimeout(1500); 
  await expect(page.locator('.cart_item')).toHaveCount(3);

  // 4. CHECKOUT
  await page.locator('[data-test="checkout"]').click();
  await page.waitForTimeout(1500); 
  await page.locator('[data-test="firstName"]').fill('Test');
  await page.locator('[data-test="lastName"]').fill('User');
  await page.locator('[data-test="postalCode"]').fill('54000');
  await page.locator('[data-test="continue"]').click();
  await expect(page.locator('.summary_total_label')).toBeVisible();

  // 5. FINISH ORDER
  await page.locator('[data-test="finish"]').click();
  await page.waitForTimeout(1500); 
  await expect(page.getByText('Thank you for your order!')).toBeVisible();

  // 6. LOGOUT
  await page.getByRole('button', { name: 'Open Menu' }).click();
  await page.locator('[data-test="logout-sidebar-link"]').click();
  await expect(page.locator('[data-test="login-button"]')).toBeVisible();
});