import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyController.getFaculties);
router.get('/:facultyId', FacultyController.getSinglegetFaculty);
router.patch('/:id', validateRequest(updateFacultyValidationSchema), FacultyController.updateFaculty,
);
router.delete('/:facultyId', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
