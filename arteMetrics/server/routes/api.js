const express = require('express');

const apiRouter = express.Router();

apiRouter.get(
  '/',
  // add middleware here
  (req, res) => res.sendStatus(200)
);

// ADD API ROUTES HERE

module.exports = apiRouter;
