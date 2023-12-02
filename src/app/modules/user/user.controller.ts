import { Request, Response } from "express";
import { UserServices } from "./user.service";
import studentValidationSchema from "../student/student.validation";

const createStudent = async (req: Request, res: Response) => {
    try {    
  
        const { password, student: studentData} = req.body;

      // validate using zod
    //   const zodPerseData = studentValidationSchema.parse(studentData);
      
      const result = await UserServices.createStudentIntoDB(password, studentData);
  
      res.status(400).json({
        success: true,
        message: 'Student created successfully',
        data: result,
      });
    } catch (error:any) {
        console.log(error);
      res.status(500).json({
        success: false,
        message: error.message || 'Something went wrong',
        error: error,
      });
    }
  };
  
    export const UserController = {
        createStudent,
    };