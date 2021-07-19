import { DataTypes, Sequelize } from 'sequelize';
import { DepartmentStatic } from './department.model.d';
import sequelizeInstance from '../lib/sequelize';

const DepartmentModel = function (sequelize: Sequelize): DepartmentStatic {
    const Department = <DepartmentStatic>sequelize.define('departments', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        nameDepartment: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            defaultValue: '',
        },
    });
    return Department;
};

export default DepartmentModel(sequelizeInstance);
