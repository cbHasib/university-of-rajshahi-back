import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import {academicDepartmentService} from './academicDepartment.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicDepartment: RequestHandler = catchAsync(async (req, res) => {
  const departmentData  = req.body;

  const result =
    await academicDepartmentService.createAcademicDepartmentIntoDB(departmentData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Academic Department created successfully',
    data: result,
  });
});

const getAcademicDepartments: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicDepartmentService.getAcademicDepartmentsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic departments fetched successfully',
    data: result,
  });
});

const getAcademicDepartmentById: RequestHandler = catchAsync(async (req, res) => {
  const { departmentId } = req.params;
  const result =
    await academicDepartmentService.getAcademicDepartmentByIdFromDB(departmentId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Department fetched successfully',
    data: result,
  });
});

const updateAcademicDepartmentById: RequestHandler = catchAsync(
  async (req, res) => {
    const { departmentId } = req.params;
    const  departmentData = req.body;
    const result = await academicDepartmentService.updateAcademicDepartmentByIdFromDB(
        departmentId,
        departmentData,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Department updated successfully',
      data: result,
    });
  },
);

export const academicDepartmentController = {
  createAcademicDepartment,
  getAcademicDepartments,
  getAcademicDepartmentById,
  updateAcademicDepartmentById,
};
