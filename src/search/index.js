const Search = require('./search.controller');

const router = require('express').Router();

router.get('/search', Search);

module.exports = router;
