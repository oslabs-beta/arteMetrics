require('dotenv').config();
//Apollo-server
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const LaunchAPI = require('./launch');

// added middleware to access database
const queryController = require('./controllers/queryController');

const app = express();
const PORT = 4000;

const dataSources = () => ({
  launchAPI: new LaunchAPI()
});

//defining an instance of the ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources,
  introspection: false,
  playground: true
});

server.applyMiddleware({ app });

// route that handles initial graph (last 24 hours)
app.get('/query', queryController.getAllQueries, (req, res) => {
  res.status(200).json(res.locals.queries);
});

// route that handles specific query operation
app.get('/query/:id', queryController.getQueryById, (req, res) => {
  res.status(200).json(res.locals.query);
});

app.listen(PORT, () => {
  console.log(
    `Serving the GraphQL Playground on http://localhost:${PORT}/graphql`
  );
});
