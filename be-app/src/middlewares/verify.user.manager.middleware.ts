import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import UnauthorizedError from '../commons/http-errors/UnauthorizedError';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');

  if (!token) return next(new UnauthorizedError('Access Denied'));
  try {
    // eslint-disable-next-line no-unused-vars
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    const decodedData = Object(verified);
    if (decodedData.role === 'admin' || decodedData.role === 'user') return next();
    else return next(new UnauthorizedError('Not permission'));
  } catch (err) {
    return next(new UnauthorizedError('Invalid Token'));
  }
};
