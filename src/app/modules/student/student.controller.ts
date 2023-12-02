import { NextFunction, Request, Response } from 'express';
import { StudentServices } from './student.service';
import studentValidationSchema from './student.validation';

const getStudents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await StudentServices.getStudentsFromDB();

    res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    res.status(200).json({
      success: true,
      message: 'Students fetched successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};


const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {    

    const { studentId } = req.params;
    
    const result = await StudentServices.deleteStudentFromDB(studentId);

    res.status(400).json({
      success: true,
      message: 'Student deleted successfully',
      data: result,
    });
  } catch (error:any) {
    next(error);
  }
};

export const StudentController = {
  getStudents,
  getSingleStudent,
  deleteStudent,
};
