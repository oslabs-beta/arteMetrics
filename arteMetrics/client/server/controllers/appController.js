const { uuid } = require('uuidv4');
const db = require('../db/model');

const appController = {};

appController.createAPI = (req, res, next) => {
  // issue a new API key
  const apiKey = uuid();
  res.locals.apiKey = apiKey;

  // insert API KEY + APP NAME + USER ID to DB
  const appName = req.body.app_name;
  const userName = req.body.user;
  console.log('App: ' + appName + ' ' + userName);

  // make user_id dynamic
  const text = `INSERT INTO "apiKeys" (api_key, app_name, user_id) VALUES ('${apiKey}', '${appName}', (SELECT id FROM "users" where username = '${userName}')) RETURNING *`;

  db.query(text)
    .then((res) => {
      console.log(res.rows[0]);
    })
    .catch((e) => console.log(e));
  return next();
};

module.exports = appController;
