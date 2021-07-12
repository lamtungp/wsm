import { DataTypes, Sequelize } from 'sequelize';
import { UserStatic } from '../interfaces/user';
import sequelizeInstance from '../lib/sequelize';

const RoomModel = function (sequelize: Sequelize): UserStatic {
    const Room = <UserStatic>sequelize.define(
        'rooms',
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nameRoom: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            members: {
                type: DataTypes.INTEGER,
                allowNull: true,
            },
        },
        {
            timestamps: false,
        },
    );
    return Room;
};

export default RoomModel(sequelizeInstance);
