import { Request, Response, NextFunction } from 'express';
import InternalServerError from '../commons/http-errors/InternalServerError';
import { generateTokenConfirm } from '../lib/passports';
import UserRepository from '../repositories/user.repository';
import CheckinRepository from '../repositories/checkin.repository';
import RequestRepository from '../repositories/request.repository';
import sendEmail from '../lib/nodemailer';
import Bcrypt from '../lib/bcrypt';
import NotFoundError from '../commons/http-errors/NotFoundError';
import BadRequestError from '../commons/http-errors/BadRequestError';
import { responseSuccess } from '../helpers/response';
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
    return next(new InternalServerError());
  };

  public getListUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await this.user.getListUser(Number(req.params.departmentId));
    if (!!users) {
      return responseSuccess(res, users);
    }
    return next(new InternalServerError());
  };

  public getListStaffs = async (req: Request, res: Response, next: NextFunction) => {
    const manager = await this.user.findUser(String(req.query.email));
    if (!!manager) {
      const users = await this.user.getListStaff(manager.departmentId, String(req.query.role));
      if (!!users) {
        return responseSuccess(res, users);
      }
      return next(new NotFoundError('Not found list staff'));
    }
    return next(new NotFoundError('Not found manager'));
  };

  public getStaffsWithCheckin = async (req: Request, res: Response, next: NextFunction) => {
    const manager = await this.user.findUser(String(req.query.email));
    if (!!manager) {
      const users = await this.user.getStaffWithCheckin(manager.departmentId, String(req.query.date));
      if (!!users) {
        return responseSuccess(res, users);
      }
      return next(new NotFoundError('Not found list staff with checkin'));
    }
    return next(new NotFoundError('Not found manager'));
  };

  public findUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.user.findUser(String(req.query.email));
    if (!!user) {
      return responseSuccess(res, user);
    }
    return next(new NotFoundError('Not found user'));
  };

  public addUser = async (req: Request, res: Response, next: NextFunction) => {
    const find_user = await this.user.findUser(String(req.body.email));
    if (!!find_user) {
      return next(new BadRequestError('Email existed'));
    }
    const hashPassword = await Bcrypt.generateHashPassword(req.body.password);
    const token = generateTokenConfirm(req.body);
    const user = await this.user.createUser({
      ...req.body,
      password: hashPassword,
      confirmationCode: token,
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
          confirmationCode: token,
        };
        return responseSuccess(res, dataSuccess);
      }
      return next(new InternalServerError('Send email failure'));
    }
    return next(new BadRequestError());
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const hashPassword = await Bcrypt.generateHashPassword(req.body.password);
    const token = generateTokenConfirm(req.body);
    const user = await this.user.findUser(req.body.email);
    if (!!user) {
      const update = await this.user.updateUser({ passowrd: hashPassword }, req.body.email);
      if (!!update) {
        const send = sendEmail(
          user.name,
          user.email,
          req.body.password,
          token,
          process.env.API_CONFIRM_RESETPASS_ENTRYPOINT,
        );
        if (!!send) {
          const dataSuccess = {
            message: 'Successfully! Please check your email',
            confirmationCode: token,
          };
          return responseSuccess(res, dataSuccess);
        }
        return next(new InternalServerError('Send email failure'));
      }
      return next(new InternalServerError("Can't update"));
    }
    return next(new NotFoundError('Not found user'));
  };

  public verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.user.findUser(String(req.params.confirmationCode));
    if (!!user) {
      const update = await this.user.updateUser({ status: 'actived' }, user.email);
      return responseSuccess(res, update);
    }
    return next(new NotFoundError('Not found user'));
  };

  public updateForUser = async (req: Request, res: Response, next: NextFunction) => {
    const find_user = await this.user.findUser(String(req.query.email));
    if (!!find_user) {
      if (!!req.body.password) {
        const hashPassword = await Bcrypt.generateHashPassword(req.body.password);
        const user = await this.user.updateUser({ ...req.body, password: hashPassword }, String(req.query.email));
        if (!!user) {
          return responseSuccess(res, user);
        }
        return next(new InternalServerError());
      }
      const user = await this.user.updateUser(req.body, String(req.query.email));
      if (!!user) {
        return responseSuccess(res, user);
      }
      return next(new InternalServerError());
    }
    return next(new NotFoundError('Not found user'));
  };

  public deleteOneUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.user.findUser(String(req.query.email));
    if (!!user) {
      await this.checkin.deleteCheckinByUserId(user.id);
      await this.request.deleteRequestByUserId(user.id);
      const deleteUser = await this.user.deleteUser(String(req.query.email));
      if (!!deleteUser) {
        return responseSuccess(res, deleteUser);
      }
      return next(new InternalServerError());
    }
    return next(new NotFoundError('Not found user'));
  };
}
