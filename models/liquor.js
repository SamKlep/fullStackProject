'use strict';
module.exports = (sequelize, DataTypes) => {
  const liquor = sequelize.define('liquor', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    date: DataTypes.STRING,
    description: DataTypes.STRING,
    rating: DataTypes.STRING
  }, {});
  liquor.associate = function(models) {
    // associations can be defined here
  };
  return liquor;
};