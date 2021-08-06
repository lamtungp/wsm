import passport from 'passport';
import { Request, Response, NextFunction } from 'express';

export default (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('jwt', {}, (error, user, info) => {
        if (error) {
            console.log('err =====>', error.message);
            return next();
        }

        if (user) {
            req.user = user.dataValues;
            res.locals = res.locals || {};
            res.locals.user = user;
            return next();
        }
    })(req, res, next);
};
