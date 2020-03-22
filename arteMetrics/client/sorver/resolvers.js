//sample data

// let users = {
//   1: {
//     id: '1',
//     username: 'WobbeGang'
//   },
//   2: {
//     id: '2',
//     username: 'Sean, Brian, Saejin, Noah, Joseph'
//   },
//   3: {
//     id: '3',
//     username: 'Brian'
//   }
// };

// const me = users[3];

//resolver boilerplate

const resolvers = {};

resolvers.Query = {
  user: async (parent, { id }, { models }) => {
    return models.Student.findByPk(id);
  },
  allUsers: async (parent, args, { models }) => {
    return await models.User.findAll();
  }
};

resolvers.Mutation = {
  createUser: async (parent, { username, password }, { models }) => {
    console.log('we are here');
    console.log(models);
    return models.User.create({
      username,
      password
    });
  }
};

module.exports = resolvers;
