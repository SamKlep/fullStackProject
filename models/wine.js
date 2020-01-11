'use strict';
module.exports = (sequelize, DataTypes) => {
  const wine = sequelize.define('wine', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    date: DataTypes.INTEGER,
    description: DataTypes.STRING,
    rating: DataTypes.STRING
  }, {});
  wine.associate = function(models) {
    // associations can be defined here
  };
  return wine;
};