const user = (sequelize, DataTypes) => {
  const User = sequelize.define('users', {
    username: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
  });

  // User.associate = models => {
  //   User.hasMany(models.Message, { onDelete: 'CASCADE' });
  // };

  return User;
};

module.exports = user;
