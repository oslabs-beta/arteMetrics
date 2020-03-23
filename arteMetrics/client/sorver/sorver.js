const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const PORT = 8080;

const app = express();

const schema = require('./schema.js');
const resolvers = require('./resolvers.js');
const models = require('./models/index.js');

const queryController = require('./controllers/queryController');

require('dotenv').config();

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  tracing: true,
  context: {
    models
    //we can later use context to bring in login information from the frontend.
  }
});

server.applyMiddleware({ app, path: '/graphql' });

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  console.log('Hello World from express app.get to /');
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

//this is to verify authentication of SQL deployment
models.sequelize.authenticate();

models.sequelize.sync().then(async () => {
  app.listen(PORT, () => {
    console.log(
      `Server is listening on port: ${'http://localhost:' +
        PORT +
        '/'}...!!!!!! `
    );
    console.log(
      `🚀Apollo Server is listening on port: ${'http://localhost:' +
        PORT +
        '/graphql'} 🚀 `
    );
  });
});
