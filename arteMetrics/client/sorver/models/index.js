const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.PG);

const models = {
  User: sequelize.import('./user'),
  Queries: sequelize.import('./queries'),
  APIKeys: sequelize.import('./apikeys.js')
};

Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

// Relations
// models.sequelize.Queries.belongsTo(models.sequelize.APIKeys);
// models.sequelize.APIKeys.hasMany(models.sequelize.Queries);
// models.sequelize.APIKeys.belongsTo(models.sequelize.User);
// models.sequelize.User.hasMany(models.sequelize.APIKeys);

module.exports = models;
