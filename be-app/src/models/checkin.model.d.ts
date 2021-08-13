import { BuildOptions, Model } from 'sequelize';

export interface CheckinAttributes {
  id: number;
  checkin: string;
  checkout: string;
  date: string;
  userId: number;
}
export interface CheckinModel extends Model<CheckinAttributes>, CheckinAttributes {}

export type CheckinStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CheckinModel;
};
