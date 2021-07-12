import { DataTypes, Sequelize } from 'sequelize';
import { UserStatic } from '../interfaces/user';
import sequelizeInstance from '../lib/sequelize';

const UserModel = function (sequelize: Sequelize): UserStatic {
    const User = <UserStatic>sequelize.define(
        'users',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
            },
            username: {
                type: DataTypes.INTEGER,
                unique: true,
                allowNull: false,
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
        },
        {
            timestamps: false,
        },
    );
    return User;
};

export default UserModel(sequelizeInstance);
