import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Student created successfully',
    data: result,
  });
});


const createFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { password, faculty: facultyData } = req.body;

  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Faculty created successfully',
    data: result,
  });
});


const createAdmin: RequestHandler = catchAsync(async (req, res) => {
  const { password, admin: AdminData } = req.body;

  const result = await UserServices.createAdminIntoDB(password, AdminData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Admin created successfully',
    data: result,
  });
});

export const UserController = {
  createStudent,
  createFaculty,
  createAdmin,
};
