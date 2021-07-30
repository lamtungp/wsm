import { BuildOptions, Model } from 'sequelize';

export interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
    avatar: string;
    gender: string;
    dob: string;
    phoneNumber: string;
    senority: string;
    address: string;
    dayIn: string;
    dayOfficial: string;
    contractTerm: string;
    vacationsDay: number;
    role: string;
    departmentId: number;
    status: string;
    confirmationCode: string;
    createdAt: string;
    updatedAt: string;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
};
