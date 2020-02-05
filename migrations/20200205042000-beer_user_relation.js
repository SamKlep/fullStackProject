'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'beers',
      'user_id',
      Sequelize.INTEGER
    );
  },

  down: (queryInterface, Sequelize) => {

  }
};
