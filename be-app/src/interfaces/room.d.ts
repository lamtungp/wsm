import { BuildOptions, Model } from 'sequelize';

export interface RoomAttributes {
    id: string;
    nameRoom: string;
}
export interface RoomModel extends Model<RoomAttributes>, RoomAttributes {}

export type RoomStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): RoomModel;
};
