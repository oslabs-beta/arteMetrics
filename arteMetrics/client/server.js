const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');

const PORT = 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
  console.log('Hello World');
  res.sendStatus(200);
});

app.listen(PORT, console.log(`Server is listening on port: ${PORT}...!!!!!! `));
