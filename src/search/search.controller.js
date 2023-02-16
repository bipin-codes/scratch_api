const { clinics } = require('../utils/data');

const Search = (req, res, next) => {
  const { name, state } = req.query;

  const result = clinics.filter(
    (x) => x.clinicName === name || x.stateCode === state
  );

  res.status(200).send({ msg: 'Search ok', data: result ?? [] });
};

module.exports = Search;
