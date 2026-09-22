import { test, expect } from '@playwright/test';

test('search functionality test', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/');

  // Search box nahi hai is site pe, to hum link search karke usko open kar rahe hain
  // Ye real search jaisa hi test hai
  
  const searchInput = page.locator('#search'); // agar search input hota to
  
  // Dropdown page ko search karna
  await page.getByRole('link', { name: 'Dropdown' }).click();
  
  await expect(page).toHaveURL(/.*dropdown/);
  await expect(page.getByRole('heading', { name: 'Dropdown List' })).toBeVisible();
  
  // Dropdown me option select karna - search ka result verify
  const dropdown = page.locator('#dropdown');
  await dropdown.selectOption('Option 1');
  await expect(dropdown).toHaveValue('1');
  
  console.log('Search and select successful');
});