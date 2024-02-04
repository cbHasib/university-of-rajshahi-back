import express, { NextFunction, Request, Response } from 'express';
const app = express();
import cors from 'cors';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';
import router from './app/routes';
import sendResponse from './app/utils/sendResponse';
import cookieParser from 'cookie-parser';

// parser
app.use(express.json());
app.use(cookieParser());
app.use(cors( { origin: ['http://localhost:5173'], credentials: true } ));

// Application routes
app.use('/api/v1', router);

const test = async (req: Request, res: Response) => {
  const welcomeMessage = 'Welcome to the API';
  sendResponse(res, {
    success: true,
    statusCode: 200,
    message: welcomeMessage,
    data: null,
  });
};

app.get('/', test);

// Not Found handler
app.use(notFoundHandler);

// Error handler
app.use(globalErrorHandler);



export default app;
