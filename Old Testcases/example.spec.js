import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://login.salesforce.com/');
  await page.getByRole('textbox', { name: 'Username' }).fill('ciqra632@gmail.com');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('4318211baba!');
  await page.getByRole('button', { name: 'Log In' }).click();
  await page.waitForTimeout(8000);

  // Direct Opportunity create page par jao
  await page.goto('https://orgfarm-19083d36d0.lightning.force.com/lightning/o/Opportunity/new?nooverride=1');
  await page.waitForTimeout(5000);

  await page.getByLabel(/Opportunity Name/i).fill('Test Opportunity');
  await page.getByLabel(/Close Date/i).fill('09/15/2026');
  
  // Stage select karo
  await page.getByRole('combobox', { name: 'Stage' }).click();
  await page.getByRole('option', { name: 'Qualification' }).click();
  
  await page.getByRole('button', { name: 'Save', exact: true }).click();
  await page.waitForTimeout(5000);
});