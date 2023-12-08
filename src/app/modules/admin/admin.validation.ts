import { z } from 'zod';

const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20),
  middleName: z.string(),
  lastName: z.string().min(1).max(20),
});


const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string().min(6).max(20),
    admin: z.object({
      name: createUserNameValidationSchema,
      designation: z.string(),
      gender: z.enum(['male', 'female']),
      dateOfBirth: z.string().optional(),
      email: z.string().email(),
      contactNo: z.string(),
      emergencyContactNo: z.string(),
      bloodGroup: z
        .enum(['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'])
        .optional(),
      presentAddress: z.string(),
      permanentAddress: z.string(),
      profilePicture: z.string().optional(),
      managementDepartment: z.string(),
    }),
  }),
});

const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1).max(20).optional(),
  middleName: z.string().optional(),
  lastName: z.string().optional(),
});


export const updateAdminValidationSchema = z.object({
  body: z.object({
    admin: z.object(
      {
        name: updateUserNameValidationSchema.optional(),
        designation: z.string().optional(),
        gender: z.enum(['male', 'female', 'other']).optional(),
        dateOfBirth: z.string().optional(),
        email: z.string().email().optional(),
        contactNo: z.string().optional(),
        emergencyContactNo: z.string().optional(),
        bloogGroup: z
          .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'])
          .optional(),
        presentAddress: z.string().optional(),
        permanentAddress: z.string().optional(),
        profilePicture: z.string().optional(),
        managementDepartment: z.string().optional(),
      },
      {
        required_error: 'Admin is required',
        invalid_type_error: 'Admin must be an object',
      },
    ),
  }),
});

export const adminValidations = {
  createAdminValidationSchema,
  updateAdminValidationSchema,
};
