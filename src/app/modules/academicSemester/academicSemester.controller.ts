import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicSemesterService } from "./academicSemester.service";
import AppError from "../../errors/AppError";

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemester = await academicSemesterService.createAcademicSemesterIntoDB(req.body);
  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Academic semester created successfully',
    data: academicSemester
  })
});


const getAcademicSemesters = catchAsync(async (req, res) => {
    const academicSemesters = await academicSemesterService.getAcademicSemestersFromDB();
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Academic semesters fetched successfully',
        data: academicSemesters
    })
    });

const getAcademicSemesterById = catchAsync(async (req, res) => {
    const academicSemester = await academicSemesterService.getAcademicSemesterByIdFromDB(req.params.semesterId);

    if(!academicSemester) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
    }
    
    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Academic semester fetched successfully',
        data: academicSemester
    })}
);

const updateAcademicSemesterById = catchAsync(async (req, res) => {
    
    const academicSemester = await academicSemesterService.updateAcademicSemesterByIdFromDB(req.params.semesterId, req.body);
    
    if(!academicSemester) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
    }

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: 'Academic semester updated successfully',
        data: academicSemester
    })
    }
);

export const academicSemesterController = {
  createAcademicSemester,
  getAcademicSemesters,
  getAcademicSemesterById,
  updateAcademicSemesterById
}