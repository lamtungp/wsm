import { BuildOptions, Model } from 'sequelize';

export interface RequestAttributes {
    id: string;
    nameRequest: string;
    state: string;
    timeout: string;
    start: string;
    end: string;
    phoneNumber: string;
    project: string;
    reason: string;
    userID: string;
}
export interface RequestModel extends Model<RequestAttributes>, RequestAttributes {}

export type RequestStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): RequestModel;
};
