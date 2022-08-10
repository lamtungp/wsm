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
      'Users',
      [
        {
          email: 'admin@example.com',
          password: '$2a$12$jqoQ3sXnlzP2GIBY3yb2D.7scGz7gLfx7dhIn8FGnjGfd5f7lQfL2', //12345678
          name: 'admin',
          gender: 'male',
          dob: '2000-04-24',
          dayIn: '2021-07-05',
          role: 'admin',
          status: 'activated',
          departmentId: 1,
          confirmationCode: 'abcdsac',
        },
        {
          email: 'manager@example.com',
          password: '$2a$12$jqoQ3sXnlzP2GIBY3yb2D.7scGz7gLfx7dhIn8FGnjGfd5f7lQfL2', //12345678
          name: 'manager',
          gender: 'male',
          dob: '2000-04-24',
          dayIn: '2021-07-05',
          status: 'activated',
          role: 'manager',
          departmentId: 1,
          confirmationCode: 'fdsafaf',
        },
        {
          email: 'user@example.com',
          password: '$2a$12$jqoQ3sXnlzP2GIBY3yb2D.7scGz7gLfx7dhIn8FGnjGfd5f7lQfL2', //12345678
          name: 'user',
          gender: 'male',
          dob: '2000-04-24',
          dayIn: '2021-07-05',
          role: 'user',
          status: 'activated',
          departmentId: 1,
          confirmationCode: 'fdsafdsafasfaf',
        },
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
