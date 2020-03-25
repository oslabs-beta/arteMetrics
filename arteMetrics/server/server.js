require('dotenv').config();
const { ApolloServer } = require('apollo-server-express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const express = require('express');
const jwt = require('jsonwebtoken');

const models = require('./models/index.js');
const queryController = require('./controllers/queryController');
const resolvers = require('./resolvers.js');
const schema = require('./schema.js');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  tracing: true,
  context: {
    models
    //we can later use context to bring in login information from the frontend.
  }
});

app.get('/', (req, res) => {
  console.log('Hello World from express app.get to /');
  res.sendStatus(200);
});

app.post('/login', queryController.login, (req, res) => {
  const token = jwt.sign(
    { username: res.locals.user.username },
    process.env.JWT_KEY
  );
  res.status(200).send({
    success: true,
    token: token
  });
});

//middleware that handles getting all queries based on a user's api_key
app.get('/query', queryController.getAllQueries, (req, res) => {
  res.status(200).json(res.locals.queries);
});

//middleware that handles getting tracing info from a query based on user's api_key
app.get('/query/:id', queryController.getQueryById, (req, res) => {
  res.status(200).json(res.locals.query);
});

app.get('/test', (req, res) => {
  console.log('backend responding to test button');
  res.status(200).send({ response: 'proxied server functional' });
});

server.applyMiddleware({ app, path: '/graphql' });

//this is to verify authentication of SQL deployment
models.sequelize.authenticate();

models.sequelize.sync().then(async () => {
  app.listen(8080, () => {
    console.log(
      `Server is listening on port: ${'http://localhost:' +
        8080 +
        '/'}...!!!!!! `
    );
    console.log(
      `🚀Apollo Server is listening on port: ${'http://localhost:' +
        8080 +
        '/graphql'} 🚀 `
    );
  });
});