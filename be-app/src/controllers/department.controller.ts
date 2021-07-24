import { Request, Response, NextFunction } from 'express';
import InternalServerError from '../commons/http-errors/InternalServerError';
import DepartmentRepository from '../repositories/department.repository';

export default class DepartmentController {
    private department: DepartmentRepository;

    constructor() {
        this.department = DepartmentRepository.getInstance();
    }

    public getAllDepartment = async (req: Request, res: Response, next: NextFunction) => {
        const departments = await this.department.getDepartments();
        if (!!departments) {
            return res.status(200).json(departments);
        }
        next(new InternalServerError());
    };

    public addDepartment = async (req: Request, res: Response, next: NextFunction) => {
        const department = await this.department.createDepartment(req.body);
        if (!!department) {
            return res.status(200).json(department);
        }
        next(new InternalServerError());
    };

    public updateForDepartment = async (req: Request, res: Response, next: NextFunction) => {
        const department = await this.department.updateDepartment(req.body, Number(req.params.id));
        if (!!department) {
            return res.status(200).json(department);
        }
        next(new InternalServerError());
    };

    public findDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
        const department = await this.department.getDepartmentById(Number(req.params.id));
        if (!!department) {
            return res.status(200).json(department);
        }
        next(new InternalServerError());
    };
}
