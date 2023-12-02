import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';
import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getStudentsFromDB();

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Students fetched successfully',
      data: result,
    })

  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student fetched successfully',
      data: result,
    })

  } catch (error) {
    next(error);
  }
};


const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {    

    const { studentId } = req.params;
    
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'Student deleted successfully',
      data: result,
    })
  } catch (error:any) {
    next(error);
  }
};

export const StudentController = {
  getStudents,
  getSingleStudent,
  deleteStudent,
};
