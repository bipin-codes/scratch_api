const supertest = require('supertest');
const { app } = require('../src/app');
const { clinics } = require('../src/utils/data');

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

  it.each`
    name            | state                 | length            | responseCode
    ${undefined}    | ${undefined}          | ${clinics.length} | ${200}
    ${undefined}    | ${dummy_state}        | ${0}              | ${200}
    ${dummy_name}   | ${undefined}          | ${0}              | ${200}
    ${correct_name} | ${undefined}          | ${2}              | ${200}
    ${undefined}    | ${correct_state_abb}  | ${3}              | ${200}
    ${undefined}    | ${correct_state_full} | ${3}              | ${200}
    ${correct_name} | ${correct_state_abb}  | ${1}              | ${200}
  `(
    'returns $length records when clinic name is $name and state is $state',
    async ({ name, state, length, responseCode }) => {
      const {
        body: { data },
        statusCode,
      } = await getSearch({ name, state });
      expect(data).toHaveLength(length);
      expect(statusCode).toEqual(responseCode);
    }
  );
});
