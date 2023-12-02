import { z } from 'zod';

const userValidationSchema = z.object({
  password: z
    .string({
      invalid_type_error: 'Password must be a string',
    })
    .min(6, {
      message: 'Password must be at least 6 characters long',
    })
    .max(20, {
      message: 'Password must be at most 20 characters long',
    })
    .optional(),
});

export const userValidation = {
  // createUserValidation: userValidationSchema.omit({
  //     needsPasswordChange: true,
  // }),
  userValidationSchema,
};
