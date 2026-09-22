const { test, expect } = require('@playwright/test');
const BASE_URL = 'https://dummyjson.com';

test.describe('API Auth & Chaining - Iqra - FINAL', () => {

  let authToken = '';

  test.beforeAll(async ({ request }) => {
    const response = await request.post(`${BASE_URL}/auth/login`, {
      data: {
        username: 'emilys',
        password: 'emilyspass'
      }
    });
    console.log('Login Status:', response.status());
    const body = await response.json();
    authToken = body.accessToken; // DummyJSON me accessToken milta hai
    console.log('TOKEN SAVED:', authToken);
    expect(authToken).toBeTruthy();
  });

  test('1. Use Token to Get Current User', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${authToken}`
      }
    });
    expect(response.status()).toBe(200);
    const user = await response.json();
    console.log('Logged in user:', user.firstName, user.email);
    expect(user.username).toBe('emilys');
  });

  test('2. Create Product with Auth', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/products/add`, {
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      data: {
        title: 'Iqra Test Product',
        price: 99
      }
    });
    expect(response.status()).toBe(201);
    const product = await response.json();
    console.log('Product created:', product);
    expect(product.title).toBe('Iqra Test Product');
  });
});