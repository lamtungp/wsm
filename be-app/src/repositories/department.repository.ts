import departmentModel from '../models/department.model';
import { DepartmentAttributes, DepartmentStatic } from '../models/department.model.d';

export default class DepartmentRepository {
  private department: DepartmentStatic;
  static instance: DepartmentRepository;

  constructor(department: DepartmentStatic) {
    this.department = department;
  }

  static getInstance() {
    if (!DepartmentRepository.instance) {
      this.instance = new DepartmentRepository(departmentModel);
    }
    return DepartmentRepository.instance;
  }

  public async getDepartments(): Promise<DepartmentAttributes[]> {
    const departments = await this.department.findAll({});
    return departments;
  }

  public async getDepartmentById(id: number): Promise<DepartmentAttributes> {
    const department = await this.department.findOne({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      where: { id },
    });
    return department;
  }

  public async getDepartmentByName(nameDepartment: string): Promise<DepartmentAttributes> {
    const department = await this.department.findOne({
      where: { nameDepartment },
    });
    return department;
  }

  public async createDepartment(value: any): Promise<DepartmentAttributes> {
    const department = await this.department.create(value);
    return department;
  }

  public async updateDepartment(value: object, id: number): Promise<any> {
    const department = await this.department.update(value, { where: { id } });
    return department;
  }

  public async deleteDepartment(id: number): Promise<any> {
    const department = await this.department.destroy({ where: { id } });
    return department;
  }
}
