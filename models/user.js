'use strict';

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    googleId: DataTypes.STRING,
    nickname: DataTypes.STRING
  }, {});

  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.UsersBeers, {
      as: 'user_beers',
      foreignKey: 'user_id'
    });
  };
  return user;
};