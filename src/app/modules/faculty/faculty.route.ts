import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';

const router = express.Router();

router.get('/', FacultyController.getFaculties);
router.get('/:id', FacultyController.getSinglegetFaculty);
router.patch('/:id', validateRequest(updateFacultyValidationSchema), FacultyController.updateFaculty,
);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
