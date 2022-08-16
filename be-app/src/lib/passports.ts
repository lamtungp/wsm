import passportJWT from 'passport-jwt';
import * as jwt from 'jsonwebtoken';
import { PassportStatic } from 'passport';
import config from '../../config';
import { UserAttributes } from '../models/user.model.d';
import userModel from '../models/user.model';
import { NextFunction } from 'express';

const { ExtractJwt } = passportJWT;
const JwtStrategy = passportJWT.Strategy;

export function passportConfiguration(passport: PassportStatic) {
  const opts: passportJWT.StrategyOptions = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('Bearer'),
  };
  passport.use(
    new JwtStrategy(opts, async (jwtPayload: any, cb: any, next: NextFunction) => {
      const user = await userModel.findOne({
        where: { email: jwtPayload.email },
      });
      if (!!user) {
        cb(null, user);
      } else {
        cb(new Error('Something wrong in token'), false);
      }
    }),
  );
}

export function generateTokenAuth(user: UserAttributes) {
  return jwt.sign({ id: user.id, email: user.email, role: user.role }, config.jwtSecret, {
    expiresIn: config.jwtExpiresIn,
  });
}

export function generateTokenConfirm(user: UserAttributes) {
  return jwt.sign({ id: user.id, email: user.email }, config.jwtSecret, {
    expiresIn: 600,
  });
}
