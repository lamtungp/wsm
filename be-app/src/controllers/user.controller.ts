import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { generateTokenConfirm } from '../lib/passports';
import UserRepository from '../repositories/user.repository';
import CheckinRepository from '../repositories/checkin.repository';
import RequestRepository from '../repositories/request.repository';
import { sendNewEmail } from '../lib/bullboard';
import config from '../../config';
import Bcrypt from '../lib/bcrypt';
import BadRequestError from '../commons/http-errors/BadRequestError';
import { responseSuccess } from '../helpers/response';
import NotFoundError from '../commons/http-errors/NotFoundError';
import messages from '../commons/messages';
import handlePassword from '../commons/utils/handlePassword';
import Utils from '../utils';

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
    return next(new BadRequestError(messages.user.getUsersFailure));
  };

  public getListUsers = async (req: Request, res: Response, next: NextFunction) => {
    const users = await this.user.getListUser(Number(req.params.departmentId));
    if (!!users) {
      return responseSuccess(res, users);
    }
    return next(new BadRequestError(messages.user.getUsersFailure));
  };

  public getListStaffs = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    const manager = await this.user.findUser(decodedData.email);
    if (!!manager) {
      const users = await this.user.getListStaff(manager.departmentId);
      if (!!users) {
        return responseSuccess(res, users);
      }
      return next(new BadRequestError(messages.user.getUsersFailure));
    }
    return next(new NotFoundError(messages.user.managerAccountNotExists));
  };

  public getStaffsWithCheckin = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    const manager = await this.user.findUser(decodedData.email);
    if (!!manager) {
      const users = await this.user.getStaffWithCheckin(manager.departmentId, String(req.query.date));
      if (!!users) {
        return responseSuccess(res, users);
      }
      return next(new BadRequestError(messages.user.getUsersFailure));
    }
    return next(new NotFoundError(messages.user.managerAccountNotExists));
  };

  public findUserByEmail = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.user.findUser(String(req.query.email));
    if (!!user) {
      return responseSuccess(res, user);
    }
    return next(new NotFoundError(messages.auth.userNotExists));
  };

  public addUser = async (req: Request, res: Response, next: NextFunction) => {
    const find_user = await this.user.findUser(String(req.body.email));
    if (!!find_user) {
      return next(new BadRequestError(messages.auth.userExists));
    }
    const password = handlePassword(8);
    const hashPassword = await Bcrypt.generateHashPassword(password);
    const tokenConfirm = generateTokenConfirm(req.body);
    const user = await this.user.createUser({
      ...req.body,
      password: hashPassword,
      confirmationCode: tokenConfirm,
    });
    if (user) {
      const code = Utils.generateAvatarCode(user.id, process.env.JWT_SECRET);
      await Utils.setObjectPolicy(Utils.createPathImage(code));

      const { mail } = config;
      const options = {
        from: mail.user,
        to: user.email,
        subject: 'Please confirm your account',
        html: `<div>
              <h1>Email Confirmation</h1>
              <h2>Hello ${user.name}</h2>
              <p>Thank you for subscribing.</p>
              <p>Email: ${user.email}</p>
              <p>Password: ${password}</p>
              <p>Please confirm your email by clicking on the following link:</p>
              <a href=${process.env.API_CONFIRM_ACCOUNT_ENTRYPOINT}/${user.confirmationCode}> Click here</a>
          </div>`,
      };
      sendNewEmail(options);
      const dataSuccess = {
        message: messages.mail.createAccountSuccess,
        confirmationCode: tokenConfirm,
      };
      return responseSuccess(res, dataSuccess);
    }
    return next(new BadRequestError(messages.user.createUserFailure));
  };

  public resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const password = handlePassword(8);
    const hashPassword = await Bcrypt.generateHashPassword(password);
    const user = await this.user.findUser(req.body.email);
    if (!!user) {
      const update = await this.user.updateUser({ password: hashPassword }, req.body.email);
      if (!!update) {
        const { mail } = config;
        const options = {
          from: mail.user,
          to: user.email,
          subject: 'Please confirm your account',
          html: `<div>
                <h1>Email Confirmation</h1>
                <h2>Hello ${user.name}</h2>
                <p>Hello. Your new password:</p>
                <p>Email: ${user.email}</p>
                <p>Password: ${password}</p>
                <p>Please go back to login page:</p>
                <a href=${process.env.URL_PROJECT}> Click here</a>
            </div>`,
        };
        sendNewEmail(options);
        const dataSuccess = {
          message: messages.mail.resetPasswordSuccess,
        };
        return responseSuccess(res, dataSuccess);
      }
      return next(new BadRequestError(messages.user.updatePasswordFailure));
    }
    return next(new NotFoundError(messages.auth.userNotExists));
  };

  public verifyAccount = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.user.findUser(String(req.params.confirmationCode));
    if (!!user) {
      const update = await this.user.updateUser({ status: 'activated' }, user.email);
      if (!!update) {
        return responseSuccess(res, { message: messages.user.activeAccountSuccess });
      }
      return next(new BadRequestError(messages.user.activeAccountFailure));
    }
    return next(new NotFoundError(messages.auth.userNotExists));
  };

  public updateUserRoleAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const find_user = await this.user.findUser(String(req.query.email));
    if (!!find_user) {
      const user = await this.user.updateUser(req.body, String(req.query.email));
      if (!!user) {
        return responseSuccess(res, { message: messages.user.updateUserSuccess });
      }
      return next(new BadRequestError(messages.user.updateUserFailure));
    }
    return next(new NotFoundError(messages.auth.userNotExists));
  };

  public updateUserRoleUser = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    const find_user = await this.user.findUser(decodedData.email);
    if (!!find_user) {
      const user = await this.user.updateUser(req.body, decodedData.email);
      if (!!user) {
        return responseSuccess(res, { message: messages.user.updateUserSuccess });
      }
      return next(new BadRequestError(messages.user.updateUserFailure));
    }
    return next(new NotFoundError(messages.auth.userNotExists));
  };

  public changePassword = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    const find_user = await this.user.findUser(decodedData.email);
    if (!!find_user) {
      const { password } = req.body;
      const hashPassword = await Bcrypt.generateHashPassword(password);
      const user = await this.user.updateUser({ password: hashPassword }, decodedData.email);
      if (!!user) {
        return responseSuccess(res, { message: messages.user.updateUserSuccess });
      }
      return next(new BadRequestError(messages.user.updateUserFailure));
    }
    return next(new NotFoundError(messages.auth.userNotExists));
  };

  public deleteOneUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = await this.user.findUser(String(req.query.email));
    if (!!user) {
      await this.checkin.deleteCheckinByUserId(user.id);
      await this.request.deleteRequestByUserId(user.id);
      const deleteUser = await this.user.deleteUser(String(req.query.email));
      if (!!deleteUser) {
        return responseSuccess(res, { message: messages.user.deleteUserSuccess });
      }
      return next(new BadRequestError(messages.user.deleteUserFailure));
    }
    return next(new NotFoundError(messages.auth.userNotExists));
  };

  public uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    const data = await Utils.putObject(req.body.name, req.body.type, req.body.userId);
    return responseSuccess(res, data);
  };
}
