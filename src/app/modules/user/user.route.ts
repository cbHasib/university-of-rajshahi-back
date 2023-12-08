import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middlewares/validateRequest';
import { studentValidations } from '../Student/student.validation';
import { facultyValidations } from '../Faculty/faculty.validation';
import { adminValidations } from '../Admin/admin.validation';

const router = express.Router();

router.post('/create-student', validateRequest(studentValidations.createStudentValidationSchema), UserController.createStudent);

router.post('/create-faculty', validateRequest(facultyValidations.createFacultyValidationSchema), UserController.createFaculty);


router.post('/create-admin', validateRequest(adminValidations.createAdminValidationSchema), UserController.createAdmin);


export const UserRoutes = router;
