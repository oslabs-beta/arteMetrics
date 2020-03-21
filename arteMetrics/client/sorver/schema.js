const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    allUsers: [User!]
  }

  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Mutation {
    createAccount(username: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
