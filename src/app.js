require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');
const app = express();

console.log(process.env);

// Init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
// Init db
require('./db/init.mongodb');

// const { checkOverloadConnect } = require('./helpers/check.connect');
// checkOverloadConnect();
// Init routes
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Welcome Meichan',
  });
});
// Handle Error

module.exports = app;
