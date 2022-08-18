'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert(
      'departments',
      [
        { nameDepartment: 'D1', description: 'hello' },
        { nameDepartment: 'D2', description: 'hello' },
        { nameDepartment: 'D3', description: 'hello' },
        { nameDepartment: 'Support', description: 'hello' },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
