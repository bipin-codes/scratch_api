const { clinics } = require('../utils/data');

const Search = (req, res, next) => {
  const { name } = req.query;
  const result = clinics.filter(
    (x) => x.name === name || x.clinicName === name
  );
  res.status(200).send({ data: result });
};

module.exports = Search;
