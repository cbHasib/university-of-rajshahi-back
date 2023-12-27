import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { FacultyController } from './faculty.controller';
import { updateFacultyValidationSchema } from './faculty.validation';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.faculty),
  FacultyController.getFaculties,
);
router.get('/:id', FacultyController.getSinglegetFaculty);
router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyController.updateFaculty,
);
router.delete('/:id', FacultyController.deleteFaculty);

export const FacultyRoutes = router;
