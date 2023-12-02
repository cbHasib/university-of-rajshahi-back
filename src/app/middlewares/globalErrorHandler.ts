import { NextFunction, Request, Response } from 'express';

const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.status || err.code || 500;
  const message = err.message || 'Something went wrong';

  res.status(statusCode).json({
    success: false,
    message: message,
    error: {
        code: statusCode,
        details: err
    }
  });
};


export default globalErrorHandler;