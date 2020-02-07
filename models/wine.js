'use strict';
module.exports = (sequelize, DataTypes) => {
  const wine = sequelize.define('wine', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    vineyard: DataTypes.STRING,
    vintage: DataTypes.STRING,
    date: DataTypes.INTEGER,
    description: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    rating: DataTypes.STRING
  }, {});
  wine.associate = function(models) {

    wine.belongsTo(models.user,{
      as: 'wines',
      foreignKey: 'user_id'
    });
  };
  return wine;
};

