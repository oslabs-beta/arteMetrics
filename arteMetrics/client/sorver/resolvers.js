//sample data

let users = {
  1: {
    id: '1',
    username: 'WobbeGang'
  },
  2: {
    id: '2',
    username: 'Sean, Brian, Saejin, Noah, Joseph'
  },
  3: {
    id: '3',
    username: 'Brian'
  }
};

const me = users[3];

//resolver boilerplate

const resolvers = {};

resolvers.Query = {
  allUsers: () => {
    return 'hello';
  }
};

resolvers.Mutation = {
  createUser: (parent, args, context) => {}
};

module.exports = resolvers;
