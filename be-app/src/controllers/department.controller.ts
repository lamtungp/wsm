import { Request, Response, NextFunction } from 'express';
import BadRequestError from '../commons/http-errors/BadRequestError';
import NotFoundError from '../commons/http-errors/NotFoundError';
import { responseSuccess } from '../helpers/response';
import DepartmentRepository from '../repositories/department.repository';
import UserRepository from '../repositories/user.repository';
import messages from '../commons/messages';

export default class DepartmentController {
  private department: DepartmentRepository;
  private user: UserRepository;

  constructor() {
    this.department = DepartmentRepository.getInstance();
    this.user = UserRepository.getInstance();
  }

  public getAllDepartment = async (_req: Request, res: Response, next: NextFunction) => {
    const departments = await this.department.getDepartments();
    if (!!departments) {
      return responseSuccess(res, departments);
    }
    return next(new BadRequestError(messages.department.getFaliure));
  };

  public addDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const find_deparment = await this.department.getDepartmentByName(req.body.nameDepartment);
    if (!!find_deparment) {
      return next(new BadRequestError(messages.department.departmentExists));
    }
    const department = await this.department.createDepartment(req.body);
    if (!!department) {
      return responseSuccess(res, department);
    }
    return next(new BadRequestError(messages.department.addFailure));
  };

  public updateForDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const find_department = await this.department.getDepartmentById(Number(req.params.departmentId));
    if (!!find_department) {
      const department = await this.department.updateDepartment(req.body, Number(req.params.departmentId));
      if (!!department) {
        return responseSuccess(res, { message: messages.department.updateSuccess });
      }
      return next(new BadRequestError(messages.department.updateFailure));
    }
    return next(new NotFoundError(messages.department.departmentNotExists));
  };

  public findDepartmentById = async (req: Request, res: Response, next: NextFunction) => {
    const department = await this.department.getDepartmentById(Number(req.params.departmentId));
    if (!!department) {
      return responseSuccess(res, department);
    }
    return next(new NotFoundError(messages.department.departmentNotExists));
  };

  public deleteOneDepartment = async (req: Request, res: Response, next: NextFunction) => {
    const find_department = await this.department.getDepartmentById(Number(req.params.departmentId));
    if (!!find_department) {
      const users = await this.user.findUserByDeparment(find_department.id);
      if (users.length > 0) {
        return next(new BadRequestError(messages.department.notAllowDelete));
      }
      const department = await this.department.deleteDepartment(Number(req.params.departmentId));
      if (!!department) {
        return responseSuccess(res, { message: messages.department.deleteFailure });
      }
      return next(new BadRequestError(messages.department.deleteFailure));
    }
    return next(new NotFoundError(messages.department.departmentNotExists));
  };
}
