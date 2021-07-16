'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('checkeds', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            checkin: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            checkout: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            day: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            month: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            userID: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
            },
        });
    },

    down: async (queryInterface, Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('checkeds');
    },
};
