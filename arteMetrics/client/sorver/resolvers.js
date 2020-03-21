const resolvers = {};

resolvers.Query = {
  me: () => {
    return {
      username: 'WobbeGang'
    };
  }
};

module.exports = resolvers;
