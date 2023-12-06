import { RequestHandler } from 'express';
import catchAsync from '../../utils/catchAsync';
import { academicFacultyService } from './academicFaculty.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const facultyData  = req.body;

  const result =
    await academicFacultyService.createAcademicFacultyIntoDB(facultyData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Academic Faculty created successfully',
    data: result,
  });
});

const getAcademicFaculties: RequestHandler = catchAsync(async (req, res) => {
  const result = await academicFacultyService.getAcademicFacultiesFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculties fetched successfully',
    data: result,
  });
});

const getAcademicFacultyById: RequestHandler = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await academicFacultyService.getAcademicFacultyByIdFromDB(facultyId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Academic Faculty fetched successfully',
    data: result,
  });
});

const updateAcademicFacultyById: RequestHandler = catchAsync(
  async (req, res) => {
    const { facultyId } = req.params;
    const  facultyData = req.body;
    const result = await academicFacultyService.updateAcademicFacultyByIdFromDB(
      facultyId,
      facultyData,
    );

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Academic Faculty updated successfully',
      data: result,
    });
  },
);

export const academicFacultyController = {
  createAcademicFaculty,
  getAcademicFaculties,
  getAcademicFacultyById,
  updateAcademicFacultyById,
};
