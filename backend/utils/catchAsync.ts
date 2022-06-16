import { Request, Response, NextFunction } from 'express';

export const catchAsync = async (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    return fn(req, res, next).catch(next);
  }
};