import { DataTypes, Sequelize } from 'sequelize';
import { CheckinStatic } from './checkin.model.d';
import sequelizeInstance from '../lib/sequelize';
import userModel from './user.model';

const CheckinModel = function (sequelize: Sequelize): CheckinStatic {
    const Checkin = <CheckinStatic>sequelize.define('checkins', {
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
        date: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
        userId: {
            type: DataTypes.INTEGER,
            references: { model: 'users', key: 'id' },
        },
    });

    Checkin.belongsTo(userModel, { foreignKey: 'userId' });

    return Checkin;
};

export default CheckinModel(sequelizeInstance);
