const mapState = require('../middleware/mapState');
const Search = require('./search.controller');

const router = require('express').Router();

router.get('/search', mapState, Search);

module.exports = router;
