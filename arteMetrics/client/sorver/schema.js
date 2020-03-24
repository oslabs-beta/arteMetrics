const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    user(id: ID!): User
    allUsers: [User!]
  }

  type Mutation {
    createUser(username: String!, password: String!): AuthPayLoad!
  }

  type User {
    id: ID!
    username: String!
    password: String!
  }

  type AuthPayLoad {
    token: String!
  }
`;

module.exports = typeDefs;
