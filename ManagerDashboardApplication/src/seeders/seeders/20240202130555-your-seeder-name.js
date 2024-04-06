'use strict';

/** @type {import('sequelize-cli').Seed} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Accounts', [
      {
        email: 'admin@gmail.com',
        password: '123',
       
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('Accounts', null, {});
     */
  }
};
