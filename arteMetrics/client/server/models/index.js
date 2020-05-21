const Sequelize = require('sequelize');
require('dotenv').config();

//declares new instance os Sequelize which will help us layer GQL on top of RESTful API
const sequelize = new Sequelize(process.env.PG);

//imports table declarations
const models = {
  User: sequelize.import('./user'),
  Queries: sequelize.import('./queries'),
  APIKeys: sequelize.import('./apikeys.js')
};

Object.keys(models).forEach((modelName) => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

//just some stuff we have to do !?
models.sequelize = sequelize;
models.Sequelize = Sequelize;

// Relations
// models.sequelize.Queries.belongsTo(models.sequelize.APIKeys);
// models.sequelize.APIKeys.hasMany(models.sequelize.Queries);
// models.sequelize.APIKeys.belongsTo(models.sequelize.User);
// models.sequelize.User.hasMany(models.sequelize.APIKeys);

module.exports = models;
