const { test, expect } = require('@playwright/test');
const BASE_URL = 'https://reqres.in/api';

test.describe('API Testing - Iqra', () => {
  test('1. GET - Get Users', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/users?page=2`);
    expect(response.status()).toBe(200);
    const body = await response.json();
    console.log(body);
  });

  test('2. POST - Create User', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/users`, {
      data: { name: "Iqra", job: "QA Engineer" }
    });
    expect(response.status()).toBe(201);
    const body = await response.json();
    console.log('Created:', body);
  });

  test('3. PUT - Update', async ({ request }) => {
    const response = await request.put(`${BASE_URL}/users/2`, {
      data: { name: "Iqra Ch", job: "Expert" }
    });
    expect(response.status()).toBe(200);
  });

  test('4. DELETE', async ({ request }) => {
    const response = await request.delete(`${BASE_URL}/users/2`);
    expect(response.status()).toBe(204);
  });
});