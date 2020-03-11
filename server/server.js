const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

/**
 * REQUIRE IN ROUTERS HERE
 */
const apiRouter = require('./routes/api');

const PORT = 3000;

/**
 * Handle parsing of the body and cookies
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

/**
 *  Route handlers
 */
app.use('/api', apiRouter);

// response with main app
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
);

// catch-all route handler for any requests to an unknown route
app.use((req, res) => res.sendStatus(404));

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred. Check server logs for detials.' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

process.env.NODE_ENV = 'development';
console.log(process.env);
/**
 * Start server
 */
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
