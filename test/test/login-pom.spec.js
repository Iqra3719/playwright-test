import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPage.js';

test('My First POM Test', async ({ page }) => {
  const login = new LoginPage(page);
  await login.goto();
  await login.doLogin('tomsmith', 'SuperSecretPassword!');
  await expect(page).toHaveURL(/.*secure/);
});