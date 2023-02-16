const supertest = require('supertest');
const { app } = require('../src/app');

describe('Search Tests', () => {
  it('can call /search endpoint', async () => {
    const { statusCode } = await supertest(app).get('/search');
    expect(statusCode).toBe(200);
  });
  it('can pass name as search parameter to call /search endpoint', async () => {
    const { statusCode } = await supertest(app)
      .get('/search')
      .query({ name: 'abc' });
    expect(statusCode).toBe(200);
  });
  it('returns empty object if name not found', async () => {
    const name = 'dummy name';
    const {
      body: { data },
    } = await supertest(app).get('/search').query({ name });
    expect(data).toBeDefined();
  });
  it('returns all records found for a given name', async () => {
    const name = 'Good Health Home';
    const {
      body: { data },
    } = await supertest(app).get('/search').query({ name });
    expect(data).toHaveLength(2);
    expect(data[0]).toEqual({
      clinicName: 'Good Health Home',
      stateCode: 'FL',
      opening: {
        from: '15:00',
        to: '20:00',
      },
    });
  });
});
