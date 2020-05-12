require('dotenv').config();
const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');
const moment = require('moment');
const resolvers = {};

resolvers.Query = {
  //returns specific users based on id passed by frontend
  user: async (parent, { id }, { models }) => {
    return models.User.findByPk(id);
  },
  //returns all users
  allUsers: async (parent, args, { models }) => {
    return await models.User.findAll();
  },
  //returns queries based on queryid
  query: async (parent, { id }, { models }) => {
    return models.Queries.findByPk(id);
  },
  //returns all queries
  allQueries: async (parent, { id }, { models }) => {
    return await models.Queries.findAll({
      where: {
        // make this dynamic (per user)
        api_key: id,
        start_time: {
          [Op.gte]: moment().subtract(24, 'hours').toDate()
        }
      }
    });
  },
  //returns queries based on queryid
  allApps: async (parent, { id }, { models }) => {
    return models.APIKeys.findAll({
      where: {
        user_id: id
      }
    });
  }
};

//creates a new user
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
