'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('requests', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nameRequest: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            state: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            timeout: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            start: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            end: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            project: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            reason: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userID: {
                type: Sequelize.INTEGER,
                references: { model: 'users', key: 'id' },
            },
        });
    },

    down: async (queryInterface, _Sequelize) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('requests');
    },
};
