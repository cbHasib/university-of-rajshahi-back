import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import { CourseServices } from './course.service';

const createCourse: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.createCourseIntoDB(req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses: RequestHandler = catchAsync(async (req, res) => {
  const result = await CourseServices.getCoursesFromDB(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Courses fetched successfully',
    data: result,
  });
});

const getSingleCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course fetched successfully',
    data: result,
  });
});

const deleteCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course deleted successfully',
    data: result,
  });
});

const updateCourse: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseInDB(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result,
  });
});



const assignFacultiesToCourse: RequestHandler = catchAsync(async (req, res) => {
  const { courseId } = req.params;
  const faculties = req.body;

  const result = await CourseServices.assignFacultiesToCourseInDB(courseId, faculties);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Faculties assigned to course successfully',
    data: result,
  });
});

export const CourseController = {
  createCourse,
  getAllCourses,
  getSingleCourse,
  deleteCourse,
  updateCourse,
  assignFacultiesToCourse
};
