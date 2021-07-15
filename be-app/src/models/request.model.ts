import { DataTypes, Sequelize } from 'sequelize';
import { RequestStatic } from './request.model.d';
import sequelizeInstance from '../lib/sequelize';
import userModel from './user.model';

const RequestModel = function (sequelize: Sequelize): RequestStatic {
    const Request = <RequestStatic>sequelize.define(
        'requests',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nameRequest: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            timeout: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            start: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            end: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            phoneNumber: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            project: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            reason: {
                type: DataTypes.STRING,
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

    Request.belongsTo(userModel, { foreignKey: 'userID' });

    return Request;
};

export default RequestModel(sequelizeInstance);
