import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../student/student.validation';
import { facultyValidations } from '../faculty/faculty.validation';

const router = express.Router();

router.post('/create-student', validateRequest(studentValidations.createStudentValidationSchema), UserController.createStudent);

router.post('/create-faculty', validateRequest(facultyValidations.createFacultyValidationSchema), UserController.createFaculty);


export const UserRoutes = router;
