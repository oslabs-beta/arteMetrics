const queries = (sequelize, DataTypes) => {
  const Queries = sequelize.define(
    'queries',
    {
      name: DataTypes.STRING,
      duration: DataTypes.INTEGER,
      start_time: DataTypes.DATE,
      end_time: DataTypes.DATE
    },
    {
      timestamps: false
    }
  );

  return Queries;
};

module.exports = queries;
