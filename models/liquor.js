'use strict';
module.exports = (sequelize, DataTypes) => {
  const liquor = sequelize.define('liquor', {
    name: DataTypes.STRING,
    manufacturer: DataTypes.STRING,
    type: DataTypes.STRING,
    date: DataTypes.STRING,
    description: DataTypes.STRING,
    rating: DataTypes.STRING
  }, {});
  liquor.associate = function(models) {
    liquor.belongsTo(models.user,{
      as: 'liquors',
      foreignKey: 'user_id'
    });
  };
  return liquor;
};
