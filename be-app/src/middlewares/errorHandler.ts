import { Request, Response, NextFunction } from 'express';

// eslint-disable-next-line import/prefer-default-export
export const errorHandler = async (err: any, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.status || 500;
  const error: any = {
    message: err.message || 'INTERNAL SERVER ERROR',
  };
  res.status(statusCode).json(error);
};