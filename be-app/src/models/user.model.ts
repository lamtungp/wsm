import { Sequelize, DataTypes } from 'sequelize';
import { UserStatic } from './user.model.d';
import sequelizeInstance from '../lib/sequelize';
import roomModel from './room.model';
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

// @Table({
//     timestamps: false,
// })
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
