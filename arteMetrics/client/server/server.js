const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const PORT = 8080;

const app = express();

app.use(favicon(path.join(__dirname, '../public/favicon.ico')));

const schema = require('./schema.js');
const resolvers = require('./resolvers.js');
const models = require('./models/index.js');

const queryController = require('./controllers/queryController');
const appController = require('./controllers/appController');
const userController = require('./controllers/userController');

require('dotenv').config();

//declaration of new instance of ApolloServer
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  tracing: true,
  context: {
    models
    //we can later use context to bring in login information from the frontend.
  }
});

//connecting Apollo to express @/graphql endpoint
server.applyMiddleware({ app, path: '/graphql' });

//express stuff
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, '../build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../build', 'index.html'));
});

//RESTFUL endpoint for login just because
app.post('/login', queryController.login, (req, res) => {
  if (res.locals.user[0] === undefined) {
    res.json({ error: 'incorrect username or password' });
  } else {
    const token = jwt.sign(res.locals.user[0].username, process.env.JWT_KEY);
    res.status(200).json({
      success: true,
      token: token
    });
  }
});

//endpoint to verify jwts stored in cookies to send username back to frontend so the frontend knows who is logged in
app.post('/testjwt', (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.JWT_KEY);
  console.log('testjwt result: ', user);
  res.send({ user: user });
});

app.post('/createApp', appController.createAPI, (req, res) => {
  res.status(200).json(res.locals.apiKey);
});

app.post('/getuserid', userController.getID, (req, res) => {
  console.log('RESPONSE: ', res.locals.id);
  res.status(200).json(res.locals.id);
});

// //middleware that handles getting all queries based on a user's api_key
app.get('/query', queryController.getAllQueries, (req, res) => {
  res.status(200).json(res.locals.queries);
});

// //middleware that handles getting tracing info from a query based on user's api_key
app.get('/query/:id', queryController.getQueryById, (req, res) => {
  res.status(200).json(res.locals.query);
});

//this is to verify authentication of SQL deployment
models.sequelize.authenticate();

//connects the apolloserver to the SQL database.
models.sequelize.sync().then(async () => {
  app.listen(PORT, () => {
    console.log(
      `Server is listening on port: ${
        'http://localhost:' + PORT + '/'
      }...!!!!!! `
    );
    console.log(
      `🚀Apollo Server is listening on port: ${
        'http://localhost:' + PORT + '/graphql'
      } 🚀 `
    );
  });
});
