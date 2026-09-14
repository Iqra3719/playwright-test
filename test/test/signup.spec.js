const { test, expect } = require('@playwright/test');

test('Signup UX test - new user', async ({ page }) => {
  const email = `test${Date.now()}@gmail.com `;

  await page.goto('https://automationexercise.com');
  await page.getByRole('link', { name: 'Signup / Login' }).click();

  // UX: signup form dikha?
  await expect(page.getByText('New User Signup!')).toBeVisible();

  await page.getByPlaceholder('Name').fill('Test User');
  await page.locator('form').filter({ hasText: 'Signup' }).getByPlaceholder('Email Address').fill(email);
  await page.getByRole('button', { name: 'Signup' }).click();

  // UX: account info page aya?
  await expect(page.getByText('Enter Account Information')).toBeVisible();

  await page.getByLabel('Mr.').check();
  await page.locator('#password').fill('123456');

  await page.locator('#first_name').fill('Test');
  await page.locator('#last_name').fill('User');
  await page.locator('#address1').fill('House 123 Street 1');
  await page.locator('#state').fill('Punjab');
  await page.locator('#city').fill('Lahore');
  await page.locator('#zipcode').fill('54000');
  await page.locator('#mobile_number').fill('03001234567');

  await page.getByRole('button', { name: 'Create Account' }).click();

  // UX: account ban gaya?
  await expect(page.getByText('Account Created!')).toBeVisible();
  await expect(page.getByText('Congratulations! Your new account has been successfully created!')).toBeVisible();
});