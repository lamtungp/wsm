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
        { nameDepartment: 'Division 1', description: 'hello' },
        { nameDepartment: 'Division 2', description: 'hello' },
        { nameDepartment: 'Division 3', description: 'hello' },
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
