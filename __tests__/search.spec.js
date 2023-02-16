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

  const timing = { from: '12:00', to: '24:00' };

  it('can call /search endpoint', async () => {
    const { statusCode } = await getSearch();
    expect(statusCode).toBe(200);
  });

  it.each`
    name            | state                 | availability                      | length            | responseCode
    ${undefined}    | ${undefined}          | ${undefined}                      | ${clinics.length} | ${200}
    ${undefined}    | ${dummy_state}        | ${undefined}                      | ${0}              | ${200}
    ${dummy_name}   | ${undefined}          | ${undefined}                      | ${0}              | ${200}
    ${correct_name} | ${undefined}          | ${undefined}                      | ${2}              | ${200}
    ${undefined}    | ${correct_state_abb}  | ${undefined}                      | ${3}              | ${200}
    ${undefined}    | ${correct_state_full} | ${undefined}                      | ${3}              | ${200}
    ${correct_name} | ${correct_state_abb}  | ${undefined}                      | ${1}              | ${200}
    ${undefined}    | ${undefined}          | ${timing}                         | ${3}              | ${200}
    ${correct_name} | ${correct_state_abb}  | ${{ from: '15:00', to: '20:00' }} | ${1}              | ${200}
  `(
    'returns $length records when clinic name is $name and state is $state availability is $availability',
    async ({ name, state, availability, length, responseCode }) => {
      const {
        body: { data },
        statusCode,
      } = await getSearch({ name, state, availability });

      expect(data).toHaveLength(length);
      expect(statusCode).toEqual(responseCode);
    }
  );
});
