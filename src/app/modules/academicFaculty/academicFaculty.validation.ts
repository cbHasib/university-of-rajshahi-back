import { z } from 'zod';

const academicFacultyValidationSchema = z.object({
    body: z.object({
        name: z.string({
            required_error: 'Faculty Name is required',
            invalid_type_error: 'Faculty Name must be a string',
        })
    })
});

export const academicFacultyValidation = {
    createAcademicFacultyValidationSchema: academicFacultyValidationSchema,
    updateAcademicFacultyValidationSchema: academicFacultyValidationSchema
}