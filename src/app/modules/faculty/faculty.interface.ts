import { Model, Types } from "mongoose";
import { TUserName } from "../user/user.interface";

export type TFaculty = {
  id: string;
  user: Types.ObjectId | string;
  name: TUserName;
  designation: string;
  gender: 'male' | 'female';
  dateOfBirth?: string;
  email: string;
  contactNo: string;
  emergencyContactNo: string;
  presentAddress: string;
  permanentAddress: string;
  bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
  profilePicture?: string;
  academicFaculty: Types.ObjectId;
  academicDepartment: Types.ObjectId;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};


// For creating static method
export interface FacultyModel extends Model<TFaculty> {
    isUserExist: (id: string) => Promise<TFaculty | null>
  }
  