'use strict';
module.exports = (sequelize, DataTypes) => {
  const beer = sequelize.define('beer', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    date: DataTypes.INTEGER,
    description: DataTypes.STRING,
    rating: DataTypes.INTEGER
  }, {});
  beer.associate = function(models) {
    // associations can be defined here
  };
  return beer;
};