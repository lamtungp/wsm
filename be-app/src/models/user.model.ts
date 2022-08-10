import { Sequelize, DataTypes } from 'sequelize';
import { UserStatic } from './user.model.d';
import sequelizeInstance from '../lib/sequelize';
import departmentModel from './department.model';
import checkinModel from './checkin.model';

const UserModel = function (sequelize: Sequelize): UserStatic {
  const User = <UserStatic>sequelize.define('Users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    gender: {
      type: DataTypes.ENUM({ values: ['male', 'female'] }),
      allowNull: false,
    },
    dob: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    phoneNumber: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    seniority: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    address: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    dayIn: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dayOfficial: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    contractTerm: {
      type: DataTypes.STRING,
      defaultValue: '',
    },
    vacationsDay: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    role: {
      type: DataTypes.ENUM({ values: ['admin', 'user', 'manager'] }),
      allowNull: false,
    },
    departmentId: {
      type: DataTypes.INTEGER,
      references: { model: 'departments', key: 'id' },
    },
    status: {
      type: DataTypes.ENUM({ values: ['activated', 'pending'] }),
      defaultValue: 'pending',
    },
    confirmationCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.belongsTo(departmentModel, { foreignKey: 'departmentId' });
  User.hasMany(checkinModel, { foreignKey: 'userId' });

  return User;
};

export default UserModel(sequelizeInstance);
