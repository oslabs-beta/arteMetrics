const db = require('../db/model');
const jwt = require('jsonwebtoken');

const userController = {};

userController.getID = (req, res, next) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.JWT_KEY);
  console.log(user);
  // make user_id dynamic
  const text = `SELECT id FROM "users" WHERE username='${user}'`;

  db.query(text)
    .then((result) => {
      console.log(result.rows[0]);
      res.locals.id = result.rows[0];
      return next();
    })
    .catch((e) => next(e));
};

module.exports = userController;
