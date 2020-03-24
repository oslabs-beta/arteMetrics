const { Op } = require('sequelize');
const moment = require('moment');
const resolvers = {};

resolvers.Query = {
  user: async (parent, { id }, { models }) => {
    return models.User.findByPk(id);
  },
  allUsers: async (parent, args, { models }) => {
    return await models.User.findAll();
  },
  query: async (parent, { id }, { models }) => {
    return models.Queries.findByPk(id);
  },
  allQueries: async (parent, args, { models }) => {
    return await models.Queries.findAll({
      where: {
        api_key: 'myapikey',
        start_time: {
          [Op.gte]: moment()
            .subtract(24, 'hours')
            .toDate()
        }
      }
    });
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
