import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AdminController } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';

const router = express.Router();

router.get('/', AdminController.getAdmins);
router.get('/:adminId', AdminController.getSingleAdmin);
router.patch('/:adminId', validateRequest(updateAdminValidationSchema), AdminController.updateAdmin);
router.delete('/:adminId', AdminController.deleteAdmin);

export const AdminRoutes = router;
