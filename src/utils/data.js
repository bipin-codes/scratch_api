const CODE_NAME = {
  FL: 'Florida',
  CA: 'California',
  KS: 'Kansas',
  NV: 'New York',
};
const NAME_CODE = {
  Florida: 'FL',
  California: 'CA',
  Kansas: 'KS',
  'New York': 'NY',
  Alaska: 'AK',
  Arizona: 'AZ',
  Tennessee: 'TN',
};

const vet = require('./vet_clinics.json');
const dental = require('./dental_clinics.json');

const clinics = [
  ...vet,
  ...dental.map((x) => {
    return {
      clinicName: x.name,
      stateCode: NAME_CODE[x.stateName],
      opening: x.availability,
    };
  }),
];

module.exports = { clinics, NAME_CODE };
