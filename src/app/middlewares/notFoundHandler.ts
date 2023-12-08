import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import AppError from '../errors/AppError';

const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  // return res.status(httpStatus.NOT_FOUND).json({
  //     success: false,
  //     message: `API Route not found in the server`,
  //     error: {
  //         code: httpStatus.NOT_FOUND,
  //         details: "API Does not exist" + req.originalUrl
  //     }
  // });

  throw new AppError(httpStatus.NOT_FOUND, `API Route not found in the server`);
};

export default notFoundHandler;
