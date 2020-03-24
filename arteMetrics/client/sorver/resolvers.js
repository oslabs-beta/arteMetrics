require('dotenv').config();
const jwt = require('jsonwebtoken');

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
    console.log('inside mutation');
    const user = await models.User.create({ username, password });
    console.log(user);
    console.log('after create');
    return {
      username: username,
      password: password,
      token: jwt.sign(username, process.env.JWT_KEY)
    };
  }
};

module.exports = resolvers;
