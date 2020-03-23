const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    allQueries: [Queries!]
  }

  type Queries {
    id: Int!
    name: String!
    startTime: String!
    endTime: String!
  }
`;

module.exports = typeDefs;
