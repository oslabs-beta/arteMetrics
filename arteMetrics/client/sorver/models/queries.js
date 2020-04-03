const queries = (sequelize, DataTypes) => {
  const Queries = sequelize.define(
    'queries',
    {
      api_key: DataTypes.STRING,
      name: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      resolvers: DataTypes.JSONB
    },
    {
      classMethods: {
        associate: function(models) {
          Queries.belongsTo(models.apiKeys);
        }
      },
      timestamps: false
    }
  );

  return Queries;
};

module.exports = queries;
