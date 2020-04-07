const express = require('express');
const app = express();
const data = require('./routes/data.js');

const PORT = 8081;

app.use(express.json());

app.use('/data', data);

// app.use('/', (req, res) => {
//   console.log('Hello World from /');
//   res.status(200).send({ api: 'hitapiendpoint from /' });
// });

app.use('/test', data);

// app.post('/test', (req, res) => {
//   console.log('hello: ', req);
//   console.log('Hello World from /test');
//   res.status(200).send({ api: 'hitapiendpoint from/test' });
// });

app.listen(PORT, (req, res) => {
  console.log('App is listening on port: ', PORT);
});
