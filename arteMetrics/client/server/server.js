require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const queryController = require('./controllers/queryController');

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log('Hello World');
  res.sendStatus(200);
});

//middleware that handles getting all queries based on a user's api_key
app.get('/query', queryController.getAllQueries, (req, res) => {
  console.log('inside querycontroller.getAllQueries');
  res.status(200).json(res.locals.queries);
});

//middleware that handles getting tracing info from a query based on user's api_key
app.get('/query/:id', queryController.getQueryById, (req, res) => {
  console.log('inside queryController.getQueryById');
  res.status(200).json(res.locals.query);
});

app.get('/test', (req, res) => {
  console.log('backend responding to test button');
  res.status(200).send({ response: 'proxied server functional' });
});

app.listen(PORT, console.log(`Server is listening on port: ${PORT}...!!!!!! `));
