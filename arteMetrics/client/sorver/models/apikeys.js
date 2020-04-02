const apiKeys = (sequelize, DataTypes) => {
  const APIKeys = sequelize.define(
    'apiKeys',
    {
      user_id: DataTypes.INTEGER,
      api_key: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          APIKeys.hasMany(models.Queries);
          APIKeys.belongsTo(models.User);
        }
      }
    }
  );
  return APIKeys;
};

module.exports = apiKeys;
