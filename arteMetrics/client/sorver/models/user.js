const user = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'users',
    {
      username: {
        type: DataTypes.STRING,
        unique: true
      },
      password: DataTypes.STRING
    },
    {
      classMethods: {
        associate: function(models) {
          User.hasMany(models.APIKeys);
        }
      }
    }
  );

  return User;
};

module.exports = user;
