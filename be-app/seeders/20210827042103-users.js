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
      'users',
      [
        {
          email: 'admin@gmail.com',
          password: '$2a$12$jqoQ3sXnlzP2GIBY3yb2D.7scGz7gLfx7dhIn8FGnjGfd5f7lQfL2', //12345678
          name: 'admin',
          gender: 'male',
          dob: '2000-04-24',
          dayIn: '2021-07-05',
          role: 'admin',
          status: 'actived',
          departmentId: 1,
          confirmationCode: 'abcdsac',
        },
        {
          email: 'manager@gmail.com',
          password: '$2a$12$jqoQ3sXnlzP2GIBY3yb2D.7scGz7gLfx7dhIn8FGnjGfd5f7lQfL2', //12345678
          name: 'manager',
          gender: 'male',
          dob: '2000-04-24',
          dayIn: '2021-07-05',
          status: 'actived',
          role: 'manager',
          departmentId: 1,
          confirmationCode: 'fdsafaf',
        },
        {
          email: 'user@gmail.com',
          password: '$2a$12$jqoQ3sXnlzP2GIBY3yb2D.7scGz7gLfx7dhIn8FGnjGfd5f7lQfL2', //12345678
          name: 'user',
          gender: 'male',
          dob: '2000-04-24',
          dayIn: '2021-07-05',
          role: 'user',
          status: 'actived',
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
