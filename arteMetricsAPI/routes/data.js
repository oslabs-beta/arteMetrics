const express = require('express');
const data = express.Router();
const authController = require('../controllers/authController.js');
const dataController = require('../controllers/dataController.js');

data.post(
  '/insert',
  authController.verify,
  dataController.insert,
  (req, res) => {
    const { accessID, data } = req.body;
  }
);
module.exports = data;
