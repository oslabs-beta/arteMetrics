//Apollo-server
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { typeDefs } = require('./schema');

const app = express();
const PORT = 3000;
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
/**
 * Handle parsing of the body and cookies
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

//demo schema
const schema = gql`
  #need to define our demo graphql schema here
  type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  type User {
    id: ID!
    username: String!
  }
`;

//demo users
let users = {
  1: {
    id: '1',
    username: 'Robin Wieruch'
  },
  2: {
    id: '2',
    username: 'Dave Davids'
  }
};
const me = users[1];
//demo resolvers
const resolvers = {
  Query: {
    me: () => {
      return me;
    },
    user: (parent, { id }) => {
      return users[id];
    },
    users: () => {
      return Object.values(users);
    }
  }
};

//defining an instance of the ApolloServer
const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  //set the playground to false, need to figure out a way to render our index.html
  playground: false
});

server.applyMiddleware({ app, path: '/graphql' });

process.env.NODE_ENV = 'development';
console.log(process.env);

app.listen(PORT, () => {
  console.log(`Server is listening on http://localhost:3000/graphql`);
});

// /**
//  * REQUIRE IN ROUTERS HERE
//  */
// const apiRouter = require('./routes/api');

// /**
//  *  Route handlers
//  */
// app.use('/api', apiRouter);

// // response with main app
// app.get('/', (req, res) =>
//   res.status(200).sendFile(path.resolve(__dirname, '../index.html'))
// );

// // catch-all route handler for any requests to an unknown route
// app.use((req, res) => res.sendStatus(404));

// app.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 400,
//     message: { err: 'An error occurred. Check server logs for detials.' }
//   };
//   const errorObj = Object.assign({}, defaultErr, err);
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

// /**
//  * Start server
//  */
