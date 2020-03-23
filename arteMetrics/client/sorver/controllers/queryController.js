const db = require('../db/model');

const queryController = {};

// grabs all the queries in the last 24 hours based on dummy api key. should be dynamic in the future
queryController.getAllQueries = (req, res, next) => {
  const api_key = 'myapikey';

  const text = `
    SELECT _id, name, duration, start_time
    FROM   queries
    WHERE  start_time >= NOW() - '1 day'::INTERVAL
    AND    api_key = '${api_key}'
    `;

  db.query(text)
    .then(result => {
      res.locals.queries = result.rows;
      return next();
    })
    .catch(err => next(err));
};

// grabs query by specific _id when user selects on the front end
queryController.getQueryById = (req, res, next) => {
  const { id } = req.params;

  const text = `
    SELECT *
    FROM   queries
    WHERE  _id = ${id}
    `;

  db.query(text)
    .then(result => {
      res.locals.query = result.rows;
      return next();
    })
    .catch(err => next(err));
};

module.exports = queryController;
