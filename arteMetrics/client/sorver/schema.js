const { gql } = require('apollo-server-express');
const { GraphQLDateTime } = require('graphql-iso-date');

const typeDefs = gql`
  scalar DateTime
  type Query {
    user(id: ID!): User
    allUsers: [User!]
    allQueries: [Queries!]
    query(id: ID!): Queries
  }

  type User {
    id: ID!
    username: String!
    password: String!
  }

  type Mutation {
    createUser(username: String!, password: String!): User!
  }

  type Queries {
    id: Int!
    name: String!
    duration: Int!
    start_time: DateTime!
    end_time: DateTime!
  }
`;

module.exports = typeDefs;
