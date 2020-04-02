const express = require('express');
const data = express.Router();

data.post('/insert', (req, res) => {
  const { accessID, data } = req.body;
});
module.exports = data;
