import passport from 'passport';
import { Request, Response, NextFunction } from 'express';
import UnauthorizedError from '../commons/http-errors/UnauthorizedError';
import InternalServerError from '../commons/http-errors/InternalServerError';
import messages from '../commons/messages';

export default (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate('jwt', {}, (error, user, info) => {
    if (error) {
      return next(new UnauthorizedError(messages.auth.authFailure));
    }
    if (user) {
      req.user = user.dataValues;
      res.locals = res.locals || {};
      res.locals.user = user;
      return next();
    }
    return next(new UnauthorizedError(messages.auth.invalidBearerToken));
  })(req, res, next);
};
