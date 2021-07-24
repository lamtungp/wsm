'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            email: {
                type: Sequelize.STRING,
                unique: true,
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            avatar: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            gender: {
                type: Sequelize.ENUM({ values: ['male', 'female'] }),
                allowNull: false,
            },
            dob: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            phoneNumber: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            senority: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            address: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            dayIn: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            dayOfficial: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            contractTerm: {
                type: Sequelize.STRING,
                defaultValue: '',
            },
            vacationsDay: {
                type: Sequelize.INTEGER,
                defaultValue: 0,
            },
            role: {
                type: Sequelize.ENUM({ values: ['admin', 'user', 'manager'] }),
                allowNull: false,
            },
            departmentId: {
                type: Sequelize.INTEGER,
                references: { model: 'departments', key: 'id' },
            },
            createdAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('NOW()'),
            },
            status: {
                type: Sequelize.ENUM({ values: ['actived', 'pending'] }),
                defaultValue: 'pending',
            },
            confirmCode: {
                type: Sequelize.STRING,
                allowNull: false,
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
        await queryInterface.dropTable('users');
    },
};
