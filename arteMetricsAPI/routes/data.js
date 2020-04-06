const express = require('express');
const data = express.Router();
const authController = require('../controllers/authController.js');
const dataController = require('../controllers/dataController.js');

data.post(
  '/insert',
  // authController.verify,
  dataController.insert,
  (req, res, next) => {
    res.status(200).json(res.locals.data);
  }
);
module.exports = data;
