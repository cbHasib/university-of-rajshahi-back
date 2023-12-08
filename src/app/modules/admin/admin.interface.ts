import { Model, Types } from "mongoose";
import { TUserName } from "../user/user.interface";

export type TAdmin = {
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
  managementDepartment: Types.ObjectId | string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};


// For creating static method
export interface AdminModel extends Model<TAdmin> {
    isUserExist: (id: string) => Promise<TAdmin | null>
  }
  