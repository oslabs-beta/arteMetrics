const { gql } = require('apollo-server-express');
const { GraphQLDateTime } = require('graphql-iso-date');

const typeDefs = gql`
  scalar DateTime
  scalar JSON

  type Query {
    user(id: ID!): User
    allUsers: [User!]
    allQueries: [Queries!]
    query(id: ID!): Queries
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

  type Queries {
    id: Int!
    name: String!
    duration: Int!
    start_time: DateTime!
    end_time: DateTime!
    resolvers: JSON!
  }
`;

module.exports = typeDefs;
