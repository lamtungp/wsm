import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../commons/http-errors/UnauthorizedError';
import message from '../commons/messages';

export default (req: Request, _res: Response, next: NextFunction) => {
  const token = req.header('auth-token');

  if (!token) return next(new UnauthorizedError(message.auth.tokenNotExists));
  try {
    // eslint-disable-next-line no-unused-vars
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    if (decodedData.role === 'manager' || decodedData.role === 'user') return next();
    else return next(new UnauthorizedError(message.auth.invalidRole));
  } catch (err) {
    return next(new UnauthorizedError(message.auth.invalidToken));
  }
};
