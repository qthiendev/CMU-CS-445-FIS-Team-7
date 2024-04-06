'use strict';
const { DataTypes } = require('sequelize');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Accounts', {
      email: {
        type: Sequelize.STRING,
        allowNull: false, // Đảm bảo email không được để trống
        unique: true // Đảm bảo email là duy nhất
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false // Đảm bảo password không được để trống
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Accounts');
  }
};
