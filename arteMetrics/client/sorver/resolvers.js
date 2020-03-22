const resolvers = {};

resolvers.Query = {
  user: async (parent, { id }, { models }) => {
    return models.User.findByPk(id);
  },
  allUsers: async (parent, args, { models }) => {
    return await models.User.findAll();
  }
};

resolvers.Mutation = {
  createUser: async (parent, { username, password }, { models }) => {
    console.log(models);
    return models.User.create({
      username,
      password
    });
  }
};

module.exports = resolvers;
