import { BuildOptions, Model } from 'sequelize';

export interface UserAttributes {
    id: string;
    username: string;
    email: string;
    password: string;
}
export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export type UserStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): UserModel;
};
