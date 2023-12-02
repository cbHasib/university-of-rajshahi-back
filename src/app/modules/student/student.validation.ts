import { z } from 'zod';

const userNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string(),
  lastName: z.string().min(1).max(20),
});

const guardianValidationSchema = z.object({
  fatherName: z.string(),
  fatherPhone: z.string(),
  fatherOccupation: z.string(),
  motherName: z.string(),
  motherPhone: z.string(),
  motherOccupation: z.string(),
});

const localGuardianValidationSchema = z.object({
  name: z.string(),
  relation: z.string(),
  phone: z.string(),
  address: z.string(),
});

const studentValidationSchema = z.object({
  id: z.string(),
  // mongodb id
  user: z.string().optional(),
  password: z.string().min(6).max(20),
  name: userNameValidationSchema,
  gender: z.enum(['male', 'female']),
  dateOfBirth: z.string().optional(),
  email: z.string().email(),
  phone: z.string(),
  emergencyPhone: z.string(),
  bloodGroup: z.enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']).optional(),
  presentAddress: z.string(),
  permanentAddress: z.string(),
  guardian: guardianValidationSchema,
  localGuardian: localGuardianValidationSchema,
  profilePicture: z.string().optional(),
  status: z.enum(['active', 'inactive', 'banned']).default('active'),
  isDeleted: z.boolean().default(false),
});

export default studentValidationSchema;
