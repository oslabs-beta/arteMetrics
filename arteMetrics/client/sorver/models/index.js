const Sequelize = require('sequelize');
require('dotenv').config();

//declares new instance os Sequelize which will help us layer GQL on top of RESTful API
const sequelize = new Sequelize(process.env.PG);

//imports table declarations
const models = {
  User: sequelize.import('./user'),
  Queries: sequelize.import('./queries')
};

//helping to join tables if necessary
// Object.keys(models).forEach(key => {
//   if ('associate' in models[key]) {
//     models[key].associatel(models);
//   }
// });

//just some stuff we have to do !?
models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;
