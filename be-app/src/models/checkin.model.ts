import { DataTypes, Sequelize } from 'sequelize';
import { CheckinStatic } from './checkin.model.d';
import sequelizeInstance from '../lib/sequelize';

const CheckinModel = function (sequelize: Sequelize): CheckinStatic {
  const Checkin = <CheckinStatic>sequelize.define('Checkins', {
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

  return Checkin;
};

export default CheckinModel(sequelizeInstance);
