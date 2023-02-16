const { NAME_CODE } = require('../utils/data');

module.exports = (req, res, next) => {
  const { state } = req.query;

  if (!state) return next(); //since the state isn't coming in with value, we don't want to run our middleware
  if (state.length == 2) return next(); //since the state passed in presumably a state code we just forward it to route handler...We can refactor this with a custom middleware

  req.query = { ...req.query, state: NAME_CODE[state] ?? '--' }; //covert the state name to state code or set it to an impossible state code value if state name isn't found in our mapping.
  next();
};
