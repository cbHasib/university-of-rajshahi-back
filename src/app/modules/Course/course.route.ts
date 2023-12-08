import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CourseValidationSchema } from './course.validation';
import { CourseController } from './course.controller';

const router = express.Router();

router.post('/create-course', validateRequest(CourseValidationSchema.createCourseValidationSchema), CourseController.createCourse);

router.get('/', CourseController.getAllCourses);
router.get('/:id', CourseController.getSingleCourse);

router.patch('/:id', validateRequest(CourseValidationSchema.updateCourseValidationSchema), CourseController.updateCourse);

router.delete('/:id', CourseController.deleteCourse);

export const CourseRoutes = router;
