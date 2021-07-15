import { DataTypes, Sequelize } from 'sequelize';
import { RoomStatic } from './room.model.d';
import sequelizeInstance from '../lib/sequelize';

const RoomModel = function (sequelize: Sequelize): RoomStatic {
    const Room = <RoomStatic>sequelize.define(
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
        },
        {
            timestamps: false,
        },
    );
    return Room;
};

export default RoomModel(sequelizeInstance);
