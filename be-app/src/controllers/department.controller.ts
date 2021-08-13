import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../commons/http-errors/BadRequestError';
import NotFoundError from '../commons/http-errors/NotFoundError';
import { responseSuccess } from '../helpers/response';
import DepartmentRepository from '../repositories/department.repository';

export default class DepartmentController {
  private department: DepartmentRepository;

  constructor() {
    this.department = DepartmentRepository.getInstance();
  }

  public getAllDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const departments = await this.department.getDepartments();
    if (!!departments) {
      return responseSuccess(res, departments);
    }
    return next(new BadRequestError('Get all department failure'));
  };

  public addDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const find_deparment = await this.department.getDepartmentByName(req.body.nameDepartment);
    if (!!find_deparment) {
      return next(new BadRequestError('Department existed'));
    }
    const department = await this.department.createDepartment(req.body);
    if (!!department) {
      return responseSuccess(res, department);
    }
    return next(new BadRequestError('Add department failure'));
  };

  public updateForDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const find_department = await this.department.getDepartmentById(Number(req.params.departmentId));
    if (!!find_department) {
      const department = await this.department.updateDepartment(req.body, Number(req.params.departmentId));
      if (!!department) {
        return responseSuccess(res, { message: 'Update department successfully' });
      }
      return next(new BadRequestError('Update department failure'));
    }
    return next(new BadRequestError('Department does not exist'));
  };

  public findDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    const department = await this.department.getDepartmentById(Number(req.params.departmentId));
    if (!!department) {
      return responseSuccess(res, department);
    }
    return next(new BadRequestError('Department does not exist'));
  };

  public deleteOneDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const find_department = await this.department.getDepartmentById(Number(req.params.departmentId));
    if (!!find_department) {
      const department = await this.department.deleteDepartment(Number(req.params.departmentId));
      if (!!department) {
        return responseSuccess(res, { message: 'Delete department successfully' });
      }
      return next(new BadRequestError('Delete department failure'));
    }
    return next(new BadRequestError('Department does not exist'));
  };
}
