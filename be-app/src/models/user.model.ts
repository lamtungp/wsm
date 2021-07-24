import { Sequelize, DataTypes } from 'sequelize';
import { UserStatic } from './user.model.d';
import sequelizeInstance from '../lib/sequelize';
import departmentModel from './department.model';
import { values } from 'sequelize/types/lib/operators';
import checkinModel from './checkin.model';
// import {
//     Table,
//     Column,
//     Model,
//     HasMany,
//     DataType,
//     PrimaryKey,
//     AutoIncrement,
//     Unique,
//     Default,
// } from 'sequelize-typescript';

const UserModel = function (sequelize: Sequelize): UserStatic {
    const User = <UserStatic>sequelize.define('users', {
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
        senority: {
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
            type: DataTypes.ENUM({ values: ['actived', 'pending'] }),
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

// class User extends Model<UserStatic> {
//     @AutoIncrement
//     @Column({ type: DataType.INTEGER, primaryKey: true })
//     id: number;

//     @Unique
//     @Column(DataType.STRING)
//     email: string;

//     @Column(DataType.STRING)
//     password: string;

//     @Default('')
//     @Column(DataType.STRING)
//     avatar: string;

//     @Column(DataType.STRING)
//     name: string;

//     @Column(DataType.STRING)
//     sex: string;

//     @Default('')
//     @Column(DataType.DATEONLY)
//     dob: Date;

//     @Default('')
//     @Column(DataType.STRING)
//     phoneNumber: string;

//     @Default('')
//     @Column(DataType.STRING)
//     senority: string;

//     @Default('')
//     @Column(DataType.STRING)
//     address: string;

//     @Default('')
//     @Column(DataType.STRING)
//     dayIn: string;

//     @Default('')
//     @Column(DataType.DATEONLY)
//     dayOfficial: Date;

//     @Default('')
//     @Column(DataType.STRING)
//     contractTerm: string;

//     @Default(0)
//     @Column({ type: DataType.INTEGER })
//     vacationsDay: number;

//     @Column(DataType.STRING)
//     permission: string;

//     @Column(DataType.STRING)
//     roomID: string;
// }

// export default User;
