import { NextFunction, Response } from 'express';
import BadRequestError from '../commons/http-errors/BadRequestError';
import NotFoundError from '../commons/http-errors/NotFoundError';
import { generateTokenAuth } from '../lib/passports';
import AuthRepository from '../repositories/auth.repository';

export default class AuthController extends AuthRepository {
  public userLogin = async (req: any, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const userData = await this.checkAuthenticationData(email, password);
    if (!!userData) {
      if (userData.status === 'actived') {
        const token = generateTokenAuth(userData);
        return res.status(200).json({
          token: token,
          role: userData.role,
          id: userData.id,
          vacationDay: userData.vacationsDay,
        });
      }
      return next(new BadRequestError('User not actived'));
    }
    return next(new NotFoundError('Email or password invalid'));
  };
}
