//defines SQL table to create/reference by Sequelize
const queries = (sequelize, DataTypes) => {
  const Queries = sequelize.define(
    'queries',
    {
      name: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE,
      resolvers: DataTypes.STRING
    },
    {
      timestamps: false
    }
  );

  return Queries;
};

module.exports = queries;
