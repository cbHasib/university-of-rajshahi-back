import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidation } from '../student/student.validation';

const router = express.Router();

router.post('/create-student', validateRequest(studentValidation.createStudentValidation), UserController.createStudent);

export const UserRoute = router;
