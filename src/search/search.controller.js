const { clinics } = require('../utils/data');

const searchByName = (arr, name) => arr.filter((x) => x.clinicName === name);
const searchByState = (arr, state) => arr.filter((x) => x.stateCode === state);

const Search = (req, res) => {
  const { name, state } = req.query;

  let result = [];

  result = name ? searchByName(clinics, name) : clinics;
  console.log(state);
  result = state ? searchByState(result, state) : result;

  res.status(200).send({ msg: 'Search ok', data: result ?? [] });
};

module.exports = Search;
