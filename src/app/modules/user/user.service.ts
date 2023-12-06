import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, studentData: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // Set student role
  userData.role = 'student';

  // If password is not provided, set it to default password
  userData.password = password || (config.default_password as string);

  // Find academic semester
  const academicSemester = await AcademicSemester.findById(
    studentData.admissionSemester,
  );

  if (!academicSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
  }

  const session = await mongoose.startSession();

  try {
    // Start transaction
    session.startTransaction();
    // Set student id (Manually)
    userData.id = await generateStudentId(
      academicSemester as TAcademicSemester,
    );

    // Create a new user (transaction 1)
    const newUser = await User.create([userData], { session });

    // Create a new student
    if (!newUser?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    studentData.id = newUser[0]?.id;
    studentData.user = newUser[0]._id;

    // Create a new student (transaction 2)
    const newStudent = await Student.create([studentData], { session });

    if (!newStudent?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
    } 

    // Commit transaction
    await session.commitTransaction();
    await session.endSession();

    return newStudent;
  } catch (error) {
    // Rollback transaction
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};

export const UserServices = {
  createStudentIntoDB,
};
