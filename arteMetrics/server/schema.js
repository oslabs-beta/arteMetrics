const { gql } = require('apollo-server');
// const { makeExecutableSchema } = require('graphql-tools');
// const GraphQLJSON = require('graphql-type-json');
// const { GraphQLScalarType } = require('graphql');
// const { Kind } = require('graphql/language');

const typeDefs = gql`
  type Query {
    launches(
      pageSize: Int

      after: String
    ): LaunchConnection!
    launch(id: ID!): Launch
  }

  type Mutation {
    bookTrips(launchIds: [ID]!): TripUpdateResponse!

    cancelTrip(launchId: ID!): TripUpdateResponse!

    login(email: String): String
  }

  type TripUpdateResponse {
    success: Boolean!
    message: String
    launches: [Launch]
  }

  type LaunchConnection {
    cursor: String!
    hasMore: Boolean!
    launches: [Launch]!
  }

  type Launch {
    id: ID!
    site: String
    mission: Mission
    rocket: Rocket
    isBooked: Boolean!
  }

  type Rocket {
    id: ID!
    name: String
    type: String
  }

  type Mission {
    name: String
    missionPatch(size: PatchSize): String
  }

  enum PatchSize {
    SMALL
    LARGE
  }
`;

// MOCK typedefs when migrating to GraphQL

// const typeDefs = gql`
//   scalar Date
//   scalar JSON

//   type Query {
//     tracing: Trace
//   }

//   type Trace {
//     name: String!
//     startTime: Date!
//     endTime: Date!
//     duration: Int!
//     resolvers: JSON!
//   }
// `;

// const resolveFunctions = {
//   JSON: GraphQLJSON
// };

// const jsSchema = makeExecutableSchema({
//   typeDefs: schemaString,
//   resolvers: resolveFunctions
// });

// const resolverMap = {
//   Date: new GraphQLScalarType({
//     name: 'Date',
//     description: 'Date custom scalar type',
//     parseValue(value) {
//       return new Date(value); // value from the client
//     },
//     serialize(value) {
//       return value.getTime(); // value sent to the client
//     },
//     parseLiteral(ast) {
//       if (ast.kind === Kind.INT) {
//         return new Date(ast.value); // ast value is always in string format
//       }
//       return null;
//     }
//   })
// };

module.exports = typeDefs;
