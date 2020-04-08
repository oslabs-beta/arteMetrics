const db = require('../models/models.js');

const dataController = {};

dataController.insert = (req, res, next) => {
  console.log('hello from datacontrollInsert');
  const { apiKey, name, startTime, endTime, duration, execution } = req.body;
  const text =
    'INSERT INTO queries (api_key, name, start_time, end_time, duration, resolvers) VALUES($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [
    apiKey,
    name,
    startTime,
    endTime,
    duration,
    JSON.stringify(execution.resolvers)
  ];

  db.query(text, values)
    .then(result => {
      console.log(result);
      res.locals.data = result.rows;
      return next();
    })
    .catch(err => {
      console.log(err);
      return next(err);
    });
};

module.exports = dataController;
