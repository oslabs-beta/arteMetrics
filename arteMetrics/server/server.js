//Apollo-server
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const LaunchAPI = require('./launch');

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
  playground: true
});

server.applyMiddleware({ app });

app.listen(PORT, () => {
  console.log(
    `Serving the GraphQL Playground on http://localhost:${PORT}/graphql`
  );
});
