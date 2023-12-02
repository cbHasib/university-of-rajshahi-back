import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { academicSemesterService } from "./academicSemester.service";

const createAcademicSemester = catchAsync(async (req, res) => {
  const academicSemester = await academicSemesterService.createAcademicSemesterIntoDB(req.body);
  
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: 'Academic semester created successfully',
    data: academicSemester
  })
});

export const academicSemesterController = {
  createAcademicSemester
}