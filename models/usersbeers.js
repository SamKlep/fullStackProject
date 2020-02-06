'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersBeers = sequelize.define('UsersBeers', {
    user_id: DataTypes.INTEGER,
    beer_id: DataTypes.INTEGER
  }, {});
  UsersBeers.associate = function(models) {
    // associations can be defined here
    UsersBeers.belongsTo(models.beer, {
      as: 'beers_user',
      foreignKey: 'beer_id'
    });

    UsersBeers.belongsTo(models.user, {
      as: 'users_beer',
      foreignKey: 'user_id'
    });
  };
  return UsersBeers;
};