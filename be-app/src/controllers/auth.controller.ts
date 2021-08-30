import { NextFunction, Response } from 'express';
import BadRequestError from '../commons/http-errors/BadRequestError';
import NotFoundError from '../commons/http-errors/NotFoundError';
import { responseSuccess } from '../helpers/response';
import { generateTokenAuth } from '../lib/passports';
import AuthRepository from '../repositories/auth.repository';
import messages from '../commons/messages';

export default class AuthController extends AuthRepository {
  public userLogin = async (req: any, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const userData = await this.checkAuthenticationData(email, password);
    if (!!userData) {
      if (userData.status === 'actived') {
        const token = generateTokenAuth(userData);
        return responseSuccess(res, {
          token: token,
          role: userData.role,
          id: userData.id,
          vacationsDay: userData.vacationsDay,
        });
      }
      return next(new BadRequestError(messages.auth.inactive));
    } else if (userData === null) {
      return next(new NotFoundError(messages.auth.invalidPassword));
    }
    return next(new NotFoundError(messages.auth.userNotExists));
  };
}
