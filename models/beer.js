'use strict';
module.exports = (sequelize, DataTypes) => {
  const beer = sequelize.define('beer', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    date: DataTypes.INTEGER,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    rating: DataTypes.INTEGER
  }, {});
  beer.associate = function(models) {

    // associations can be defined here
    beer.belongsTo(models.user,{
      as: 'beers',
      foreignKey: 'user_id'
    });

  };
  return beer;
};