import { DataTypes, Sequelize } from 'sequelize';
import { RequestStatic } from './request.model.d';
import sequelizeInstance from '../lib/sequelize';
import userModel from './user.model';

const RequestModel = function (sequelize: Sequelize): RequestStatic {
  const Request = <RequestStatic>sequelize.define('requests', {
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
      type: DataTypes.ENUM({ values: ['pending', 'confirmed', 'declined'] }),
      defaultValue: 'pending',
    },
    timeout: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDay: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    endDay: {
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
    userId: {
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'id' },
    },
    handler: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
  });

  Request.belongsTo(userModel, { foreignKey: 'userId' });

  return Request;
};

export default RequestModel(sequelizeInstance);
