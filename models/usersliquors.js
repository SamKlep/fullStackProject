'use strict';
module.exports = (sequelize, DataTypes) => {
  const UsersLiquors = sequelize.define('UsersLiquors', {
    user_id: DataTypes.INTEGER,
    liquor_id: DataTypes.INTEGER
  }, {});
  UsersLiquors.associate = function(models) {
    // associations can be defined here
    UsersLiquors.belongsTo(models.liquor, {
        as: 'liquors_user',
        foreignKey: 'liquor_id'
      });
  
      UsersLiquors.belongsTo(models.user, {
        as: 'users_liquor',
        foreignKey: 'user_id'
      });
    
  };
  return UsersLiquors;
};