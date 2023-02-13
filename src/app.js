const { json } = require('express');
const express = require('express');
const app = express();

const searchRouter = require('./search');

app.use(json());
app.use(searchRouter);
module.exports = { app, port: 3000 };
