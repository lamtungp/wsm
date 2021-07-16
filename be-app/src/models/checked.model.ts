import { DataTypes, Sequelize } from 'sequelize';
import { CheckedStatic } from './checked.model.d';
import sequelizeInstance from '../lib/sequelize';
import userModel from './user.model';

const CheckedModel = function (sequelize: Sequelize): CheckedStatic {
    const Checked = <CheckedStatic>sequelize.define(
        'checkeds',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            checkin: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            checkout: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            day: {
                type: DataTypes.STRING,
                defaultValue: '',
            },
            month: {
                type: DataTypes.INTEGER,
                defaultValue: '',
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
