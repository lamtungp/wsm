import { BuildOptions, Model } from 'sequelize';

export interface CheckedAttributes {
    id: string;
    checkin: string;
    checkout: string;
    day: string;
    month: string;
    userID: string;
}
export interface CheckedModel extends Model<CheckedAttributes>, CheckedAttributes {}

export type CheckedStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): CheckedModel;
};
