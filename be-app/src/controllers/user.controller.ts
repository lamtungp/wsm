import { Request, Response, NextFunction } from 'express';
import InternalServerError from '../commons/http-errors/InternalServerError';
import { generateTokenConfirm } from '../lib/passports';
import UserRepository from '../repositories/user.repository';
import CheckinRepository from '../repositories/checkin.repository';
import RequestRepository from '../repositories/request.repository';
import sendEmail from '../lib/nodemailer';
import Bcrypt from '../lib/bcrypt';
import BadRequestError from '../commons/http-errors/BadRequestError';
import { responseSuccess } from '../helpers/response';
import NotFoundError from '../commons/http-errors/NotFoundError';
export default class UserController {
  private user: UserRepository;
  private checkin: CheckinRepository;
  private request: RequestRepository;

  constructor() {
    this.user = UserRepository.getInstance();
    this.checkin = CheckinRepository.getInstance();
    this.request = RequestRepository.getInstance();
  }

  public getAllUsers = async (_req: Request, res: Response, next: NextFunction) => {
    const users = await this.user.getUsers();
    if (!!users) {
      return responseSuccess(res, users);
    }
    return next(new BadRequestError('Get all user failure'));
  };

  public getListUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await this.user.getListUser(Number(req.params.departmentId));
    if (!!users) {
      return responseSuccess(res, users);
    }
    return next(new BadRequestError('Get list user failure'));
  };

  public getListStaffs = async (req: Request, res: Response, next: NextFunction) => {
    const manager = await this.user.findUser(String(req.query.email));
    if (!!manager) {
      const users = await this.user.getListStaff(manager.departmentId, String(req.query.role));
      if (!!users) {
        return responseSuccess(res, users);
      }
      return next(new BadRequestError('Get list staff failure'));
    }
    return next(new NotFoundError('Manager account does not exist'));
  };

  public getStaffsWithCheckin = async (req: Request, res: Response, next: NextFunction) => {
    const manager = await this.user.findUser(String(req.query.email));
    if (!!manager) {
      const users = await this.user.getStaffWithCheckin(manager.departmentId, String(req.query.date));
      if (!!users) {
        return responseSuccess(res, users);
      }
      return next(new BadRequestError('Get list staff with checkin failure'));
    }
    return next(new NotFoundError('Manager account does not exist'));
  };

  public findUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.user.findUser(String(req.query.email));
    if (!!user) {
      return responseSuccess(res, user);
    }
    return next(new NotFoundError('User does not exist'));
  };

  public addUser = async (req: Request, res: Response, next: NextFunction) => {
    const find_user = await this.user.findUser(String(req.body.email));
    if (!!find_user) {
      return next(new BadRequestError('Email existed'));
    }
    const hashPassword = await Bcrypt.generateHashPassword(req.body.password);
    const tokenConfirm = generateTokenConfirm(req.body);
    const user = await this.user.createUser({
      ...req.body,
      password: hashPassword,
      confirmationCode: tokenConfirm,
    });
    if (!!user) {
      const send = sendEmail(
        user.name,
        user.email,
        req.body.password,
        user.confirmationCode,
        process.env.API_CONFIRM_ACCOUNT_ENTRYPOINT,
      );
      if (!!send) {
        const dataSuccess = {
          message: 'User was registered successfully! Please check your email',
          confirmationCode: tokenConfirm,
        };
        return responseSuccess(res, dataSuccess);
      }
      return next(new InternalServerError('Send email failure'));
    }
    return next(new BadRequestError('Create user failure'));
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const hashPassword = await Bcrypt.generateHashPassword(req.body.password);
    const tokenConfirm = generateTokenConfirm(req.body);
    const user = await this.user.findUser(req.body.email);
    if (!!user) {
      const update = await this.user.updateUser({ passowrd: hashPassword }, req.body.email);
      if (!!update) {
        const send = sendEmail(
          user.name,
          user.email,
          req.body.password,
          tokenConfirm,
          process.env.API_CONFIRM_RESETPASS_ENTRYPOINT,
        );
        if (!!send) {
          const dataSuccess = {
            message: 'Successfully! Please check your email',
            confirmationCode: tokenConfirm,
          };
          return responseSuccess(res, dataSuccess);
        }
        return next(new BadRequestError('Send email failure'));
      }
      return next(new BadRequestError("Can't update"));
    }
    return next(new NotFoundError('User does not exist'));
  };

  public verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.user.findUser(String(req.params.confirmationCode));
    if (!!user) {
      const update = await this.user.updateUser({ status: 'actived' }, user.email);
      if (!!update) {
        return responseSuccess(res, { message: 'Account was actived' });
      }
      return next(new BadRequestError('Active account fail'));
    }
    return next(new NotFoundError('User does not exist'));
  };

  public updateForUser = async (req: Request, res: Response, next: NextFunction) => {
    const find_user = await this.user.findUser(String(req.query.email));
    if (!!find_user) {
      if (!!req.body.password) {
        const hashPassword = await Bcrypt.generateHashPassword(req.body.password);
        const user = await this.user.updateUser({ ...req.body, password: hashPassword }, String(req.query.email));
        if (!!user) {
          return responseSuccess(res, { message: 'Update password successfully' });
        }
        return next(new BadRequestError('Update password failure'));
      }
      const user = await this.user.updateUser(req.body, String(req.query.email));
      if (!!user) {
        return responseSuccess(res, { message: 'Update user successfully' });
      }
      return next(new BadRequestError('Update user failure'));
    }
    return next(new NotFoundError('User does not exist'));
  };

  public deleteOneUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.user.findUser(String(req.query.email));
    if (!!user) {
      await this.checkin.deleteCheckinByUserId(user.id);
      await this.request.deleteRequestByUserId(user.id);
      const deleteUser = await this.user.deleteUser(String(req.query.email));
      if (!!deleteUser) {
        return responseSuccess(res, { message: 'Delete user successfully' });
      }
      return next(new BadRequestError('Delete user failure'));
    }
    return next(new NotFoundError('User does not exist'));
  };
}
