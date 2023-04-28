const { test, expect } = require('@playwright/test');
const request = require('supertest');
const app = 'https://demo.fidoo.com';

test.describe('Fidoo Demo Application - API Test', () => {
  let API_KEY

  test.beforeAll(async () => {
    const payload = { "email": 'marcel.sindler@fidoo-test.com', "password": 'nt3THZ', "clientId": null};
    const res = await request(app).post('/api/services/rest/backend/security/authenticate')
    .send(payload)
    .set('Accept', 'application/json');
    expect(res.status).toBe(200); 
    expect(res.body).toHaveProperty('apiKey');
    API_KEY = res.body.apiKey;
  });

  test('Verify credit card ownership FRANTA UZIVATEL', async () => {
    const filter = 'FRANTA UZIVATEL'
    const payload = {"cardOwnership":"company","cardFilterRequest":{"fulltext": filter, "cardState":["active","soft-blocked","first-ordered"]},"queryRequest":{"limit":30,"offset":0,"sort":[{"ascendant":true,"property":"embossNameCard"}]},"withProcessTracking":true}
    const res = await request(app).post('/api/services/rest/backend/card/card-list')
    .send(payload)
    .set('x-api-key', API_KEY)
    .set('Accept', 'application/json')
    expect(res.status).toBe(200); 
    expect(res.body.cardListResponse[0].embossNameCard).toBe('FRANTA UZIVATEL');
  });
});