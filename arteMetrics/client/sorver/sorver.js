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
