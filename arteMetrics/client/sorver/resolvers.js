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
  me: () => {
    return me;
  },
  user: (parent, { id }) => {
    return users[id];
  },
  users: () => {
    return Object.values(users);
  }
};

module.exports = resolvers;
