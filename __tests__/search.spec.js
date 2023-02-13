const supertest = require('supertest');
const { app } = require('../src/app');

describe('Search Tests', () => {
  it('can call /search endpoint', async () => {
    const { statusCode } = await supertest(app).get('/search');
    expect(statusCode).toBe(200);
  });
});
