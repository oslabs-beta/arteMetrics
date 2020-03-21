const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const path = require('path');
const cookieParser = require('cookie-parser');
const cors = requqire('cors');

const PORT = 8080;

const app = express();

const schema = require('./schema.js');
const resolvers = require('./resolvers.js');

const server = new ApolloServer({
  typeDefs: schema,
  resolvers
});

server.applyMiddleware({ app, path: '/graphql' });

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get('/', (req, res) => {
  console.log('Hello World');
  res.sendStatus(200);
});

app.get('/test', (req, res) => {
  console.log('backend responding to test button');
  res.status(200).send({ response: 'proxied server functional' });
});

app.listen(PORT, () => {
  console.log(
    `Server is listening on port: ${'http://localhost:' + PORT + '/'}...!!!!!! `
  );
  console.log(
    `🚀Apollo Server is listening on port: ${'http://localhost:' +
      PORT +
      '/graphql'} 🚀 `
  );
});
