import { BuildOptions, Model } from 'sequelize';

export interface UserAttributes {
    id: string;
    name: string;
    email: string;
    password: string;
    avatar: string;
    sex: string;
    dob: string;
    phoneNumber: string;
    senority: string;
    address: string;
    dayIn: string;
    dayOfficial: string;
    contractTerm: string;
    vacationsDay: string;
    permission: string;
    roomID: string;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
};
