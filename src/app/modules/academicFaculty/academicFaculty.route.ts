import express from 'express';
import { academicFacultyController } from './academicFaculty.controller';
import { academicFacultyValidation } from './academicFaculty.validation';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

router.post('/create-academic-faculty', validateRequest(academicFacultyValidation.createAcademicFacultyValidationSchema), academicFacultyController.createAcademicFaculty);

router.get('/', academicFacultyController.getAcademicFaculties);
router.get('/:facultyId', academicFacultyController.getAcademicFacultyById);

router.patch('/:facultyId', validateRequest(academicFacultyValidation.updateAcademicFacultyValidationSchema), academicFacultyController.updateAcademicFacultyById);

export const academicFacultyRoutes = router;
