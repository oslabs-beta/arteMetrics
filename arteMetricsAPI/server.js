require('dotenv').config();
const express = require('express');
const app = express();
const data = require('./routes/data.js');

const PORT = 8081;

app.use(express.json());

app.use('/data', data);

app.use('/', (req, res) => {
  console.log('Hello World');
  res.status(200).send({ api: 'hitapiendpoint' });
});

app.use('/test', (req, res) => {
  console.log('Hello World');
  res.status(200).send({ api: 'hitapiendpoint' });
});

app.listen(PORT, (req, res) => {
  console.log('App is listening on port: ', PORT);
});
