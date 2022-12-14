import { BuildOptions, Model } from 'sequelize';

export interface RequestAttributes {
  id: number;
  nameRequest: string;
  state: string;
  timeout: string;
  startDay: string;
  endDay: string;
  phoneNumber: string;
  project: string;
  reason: string;
  userId: number;
  handler: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface RequestModel extends Model<RequestAttributes>, RequestAttributes {}

export type RequestStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): RequestModel;
};
