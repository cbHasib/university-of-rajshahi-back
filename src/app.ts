import express, { NextFunction, Request, Response } from 'express';
const app = express();
import cors from 'cors';
import { StudentRoute } from './app/modules/student/student.route';
import { UserRoute } from './app/modules/user/user.route';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFoundHandler from './app/middlewares/notFoundHandler';

// parser
app.use(express.json());
app.use(cors());

// Application routes
app.use('/api/v1/students', StudentRoute);
app.use('/api/v1/users', UserRoute);

app.get('/', (req, res) => {
  const a = 10;
  res.send(a);
});


// Error handler
app.use(globalErrorHandler);

// Not Found handler
app.use(notFoundHandler);

export default app;
