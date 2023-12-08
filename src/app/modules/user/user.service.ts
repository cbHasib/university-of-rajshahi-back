import config from '../../config';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateAdminId, generateFacultyId, generateStudentId } from './user.utils';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { AcademicDepartment } from '../academicDepartment/academicDepartment.model';
import { TFaculty } from '../faculty/faculty.interface';
import { AcademicFaculty } from '../academicFaculty/academicFaculty.model';
import { Faculty } from '../faculty/faculty.model';
import { TAdmin } from '../admin/admin.interface';
import { Admin } from '../admin/admin.model';

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



const createFacultyIntoDB = async (password: string, facultyData: TFaculty) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // Set faculty role
  userData.role = 'faculty';

  // If password is not provided, set it to default password
  userData.password = password || (config.default_password as string);

  // Find academic department
  const academicDepartment = await AcademicDepartment.findById(
    facultyData.academicDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic department not found');
  }


  // Find academic faculty
  const academicFaculty = await AcademicFaculty.findById(
    facultyData.academicFaculty,
  );

  if (!academicFaculty) {
    throw new AppError(httpStatus.NOT_FOUND, 'Academic faculty not found');
  }


  const session = await mongoose.startSession();

  try {
    // Start transaction
    session.startTransaction();
    // Set faculty id (Manually)
    userData.id = await generateFacultyId()

    // Create a new user (transaction 1)
    const newUser = await User.create([userData], { session });

    // Create a new faculty
    if (!newUser?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    facultyData.id = newUser[0]?.id;
    facultyData.user = newUser[0]._id;

    // Create a new faculty (transaction 2)
    const newFaculty = await Faculty.create([facultyData], { session });

    if (!newFaculty?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create faculty');
    } 

    // Commit transaction
    await session.commitTransaction();
    await session.endSession();

    return newFaculty;
  } catch (error) {
    // Rollback transaction
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};



const createAdminIntoDB = async (password: string, adminData: TAdmin) => {
  // create a user object
  const userData: Partial<TUser> = {};
  // Set faculty role
  userData.role = 'admin';

  // If password is not provided, set it to default password
  userData.password = password || (config.default_password as string);

  // Find academic department
  const academicDepartment = await AcademicDepartment.findById(
    adminData.managementDepartment,
  );

  if (!academicDepartment) {
    throw new AppError(httpStatus.NOT_FOUND, 'Management department not found');
  }


  const session = await mongoose.startSession();

  try {
    // Start transaction
    session.startTransaction();
    // Set faculty id (Manually)
    userData.id = await generateAdminId()

    // Create a new user (transaction 1)
    const newUser = await User.create([userData], { session });

    // Create a new faculty
    if (!newUser?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }

    adminData.id = newUser[0]?.id;
    adminData.user = newUser[0]._id;

    // Create a new faculty (transaction 2)
    const newAdmin = await Admin.create([adminData], { session });

    if (!newAdmin?.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create admin');
    } 

    // Commit transaction
    await session.commitTransaction();
    await session.endSession();

    return newAdmin;
  } catch (error) {
    // Rollback transaction
    await session.abortTransaction();
    await session.endSession();

    throw error;
  }
};


export const UserServices = {
  createStudentIntoDB,
  createFacultyIntoDB,
  createAdminIntoDB
};
