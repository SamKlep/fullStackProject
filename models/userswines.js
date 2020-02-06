'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersWines = sequelize.define('UsersWines', {
    user_id: DataTypes.INTEGER,
    wine_id: DataTypes.INTEGER
  }, {});
  UsersWines.associate = function(models) {
    // associations can be defined here
    UsersWines.belongsTo(models.wine, {
        as: 'wines_user',
        foreignKey: 'wine_id'
      });
  
      UsersWines.belongsTo(models.user, {
        as: 'users_wine',
        foreignKey: 'user_id'
      });
  };
  return UsersWines;
};