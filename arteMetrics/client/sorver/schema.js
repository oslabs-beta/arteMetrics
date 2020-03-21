const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]
  }

  type User {
    id: ID!
    username: String!
  }
`;

module.exports = typeDefs;
