const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    user(id: ID!): User
    allUsers: [User!]
  }

  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Mutation {
    createUser(username: String!, password: String!): User!
  }
`;

module.exports = typeDefs;
