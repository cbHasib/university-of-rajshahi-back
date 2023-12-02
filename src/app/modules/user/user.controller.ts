import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';

const createStudent = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { password, student: studentData } = req.body;

    // validate using zod
    //   const zodPerseData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    res.status(400).json({
      success: true,
      message: 'Student created successfully',
      data: result,
    });
  } catch (error: any) {
    next(error);
  }
};

export const UserController = {
  createStudent,
};
