const express = require('express');
const morgan = require('morgan');
const { default: helmet } = require('helmet');
const compression = require('compression');
const app = express();

// Init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
// Init db

// Init routes
app.get('/', (req, res, next) => {
  return res.status(200).json({
    message: 'Welcome Meichan',
  });
});
// Handle Error

module.exports = app;
