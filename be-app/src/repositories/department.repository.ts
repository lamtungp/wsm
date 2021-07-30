import { Op, where } from 'sequelize';
import departmentModel from '../models/department.model';
import { DepartmentStatic } from '../models/department.model.d';

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

    public async getDepartments(): Promise<any> {
        const departments = await this.department.findAll({});
        return departments;
    }

    public async getDepartmentById(id: number): Promise<any> {
        const department = await this.department.findOne({
            where: { id },
        });
        return department;
    }

    public async createDepartment(value: any): Promise<any> {
        const department = await this.department.create(value);
        return department;
    }

    public async updateDepartment(value: any, id: number): Promise<any> {
        const department = await this.department.update(value, { where: { id } });
        return department;
    }

    public async deleteDepartment(id: number): Promise<any> {
        const department = await this.department.destroy({ where: { id } });
        return department;
    }
}
