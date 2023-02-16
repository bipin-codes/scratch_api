const supertest = require('supertest');
const { app } = require('../src/app');

describe('Search Tests', () => {
  const getSearch = async (queryParams) => {
    return supertest(app).get('/search').query(queryParams);
  };

  const dummy_name = 'dummy name';
  const correct_name = 'Good Health Home';

  const dummy_state = 'dummy state';
  const correct_state_abb = 'FL';
  const correct_state_full = 'Florida';

  it('can call /search endpoint', async () => {
    const { statusCode } = await getSearch();
    expect(statusCode).toBe(200);
  });
  it('can pass name as search parameter to call /search endpoint', async () => {
    const { statusCode } = await getSearch({ name: dummy_name });
    expect(statusCode).toBe(200);
  });
  it('returns empty object if name not found', async () => {
    const {
      body: { data },
    } = await getSearch({ name: dummy_name });
    expect(data).toBeDefined();
  });
  it('returns all records found for a given name', async () => {
    const {
      body: { data },
    } = await getSearch({ name: correct_name });
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

  it('can pass state  as search parameter to call /search endpoint', async () => {
    const { statusCode } = await getSearch({ state: dummy_state });
    expect(statusCode).toBe(200);
  });
  it('returns empty object if state not found', async () => {
    const {
      body: { data },
    } = await getSearch({ name: dummy_state });
    expect(data).toBeDefined();
  });
  it('returns all records found for a given state', async () => {
    const {
      body: { data },
    } = await getSearch({ state: correct_state_abb });
    expect(data).toHaveLength(3);
  });
});
