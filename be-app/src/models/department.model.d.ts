import { BuildOptions, Model } from 'sequelize';

export interface DepartmentAttributes {
  id: number;
  nameDepartment: string;
  description: string;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface DepartmentModel extends Model<DepartmentAttributes>, DepartmentAttributes {}

export type DepartmentStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): DepartmentModel;
};
