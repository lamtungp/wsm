import { DataTypes, Sequelize } from 'sequelize';
import { UserStatic } from '../interfaces/user';
import sequelizeInstance from '../lib/sequelize';
import userModel from './user.model';

const CheckedModel = function (sequelize: Sequelize): UserStatic {
    const Checked = <UserStatic>sequelize.define(
        'checkeds',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            checkin: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            checkout: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            month: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            userID: {
                type: DataTypes.INTEGER,
                references: { model: 'users', key: 'id' },
            },
        },
        {
            timestamps: false,
        },
    );

    Checked.belongsTo(userModel, { foreignKey: 'userID' });

    return Checked;
};

export default CheckedModel(sequelizeInstance);
