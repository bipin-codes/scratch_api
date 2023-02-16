const { compareTime } = require('../utils/compareTime');
const { clinics } = require('../utils/data');

const searchByName = (arr, name) => arr.filter((x) => x.clinicName === name);

const searchByState = (arr, state) => arr.filter((x) => x.stateCode === state);

const searchByAvailability = (arr, time) =>
  arr.filter((x) => {
    const { opening } = x;
    const start = compareTime(opening.from, time.from);
    const end = compareTime(opening.to, time.to);
    return start <= 0 && end >= 0;
  });

const Search = (req, res) => {
  const { name, state, availability } = req.query;
  let result = [];

  result = name ? searchByName(clinics, name) : clinics;

  result = state ? searchByState(result, state) : result;
  result = availability ? searchByAvailability(result, availability) : result;

  res.status(200).send({ msg: 'Search ok', data: result ?? [] });
};

module.exports = Search;
