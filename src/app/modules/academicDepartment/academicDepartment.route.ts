import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { academicDepartmentValidation } from './academicDepartment.validation';
import { academicDepartmentController } from './academicDepartment.controller';

const router = express.Router();

router.post('/create-academic-department', validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema), academicDepartmentController.createAcademicDepartment);

router.get('/', academicDepartmentController.getAcademicDepartments);
router.get('/:departmentId', academicDepartmentController.getAcademicDepartmentById);

router.patch('/:departmentId', validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema), academicDepartmentController.updateAcademicDepartmentById);

export const academicDepartmentRoutes = router;
