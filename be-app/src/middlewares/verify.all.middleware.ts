import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export default (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('auth-token');

  if (!token) return res.status(401).send('Access Denied');

  try {
    // eslint-disable-next-line no-unused-vars
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch (err) {
    return res.status(401).send('Invalid Token');
  }
};
