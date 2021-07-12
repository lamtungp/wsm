import { DataTypes, Sequelize } from 'sequelize';
import { UserStatic } from '../interfaces/user';
import sequelizeInstance from '../lib/sequelize';
import roomModel from './room.model';

const UserModel = function (sequelize: Sequelize): UserStatic {
    const User = <UserStatic>sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            email: {
                type: DataTypes.INTEGER,
                unique: true,
                allowNull: false,
            },
            password: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sex: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            dob: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            senority: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            address: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            dayIn: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            dayOfficial: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            contractTerm: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            vacationsDay: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            permission: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            roomID: {
                type: DataTypes.INTEGER,
                references: { model: 'room', key: 'id' },
            },
        },
        {
            timestamps: false,
        },
    );

    User.belongsTo(roomModel, { foreignKey: 'roomID' });

    return User;
};

export default UserModel(sequelizeInstance);
