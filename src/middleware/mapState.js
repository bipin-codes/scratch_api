const { NAME_CODE } = require('../utils/data');

module.exports = (req, res, next) => {
  const { state } = req.query;

  if (state && state.length == 2) return next();

  req.query = { ...req.query, state: NAME_CODE[state] };
  next();
};
