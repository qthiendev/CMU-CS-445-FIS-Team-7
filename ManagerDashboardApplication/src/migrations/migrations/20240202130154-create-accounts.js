'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      email: {
        type: Sequelize.STRING,
        allowNull: false, 
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false 
      },
      });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Accounts');
  }
};
