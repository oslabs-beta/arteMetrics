const { uuid } = require('uuidv4');
const db = require('../db/model');

const appController = {};

appController.createAPI = (req, res, next) => {
  // issue a new API key
  const apiKey = uuid();
  res.locals.apiKey = apiKey;

  // insert API KEY + APP NAME + USER ID to DB
  const appName = req.body.app_name;
  console.log(appName);

  // make user_id dynamic
  const text =
    'INSERT INTO "apiKeys" (user_id, api_key, app_name) VALUES ($1, $2, $3) RETURNING *';

  const values = [1, apiKey, appName];

  db.query(text, values)
    .then((res) => {
      console.log(res.rows[0]);
    })
    .catch((e) => console.log(e));
  return next();
};

module.exports = appController;
