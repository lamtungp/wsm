import { NextFunction, Response } from 'express';
import InternalServerError from '../commons/http-errors/InternalServerError';
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
      return next(new InternalServerError());
    }
    return next(new InternalServerError());
  };
}
