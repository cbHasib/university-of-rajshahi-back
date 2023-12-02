import { z } from 'zod';
import { AcademicSemesterCode, AcademicSemesterName, Months } from './academicSemester.const';

const academicSemesterValidationSchema = z.object({
    body: z.object({
        name: z.enum([...AcademicSemesterName] as [string, ...string[]], {
            required_error: 'Name is required',
            invalid_type_error: 'Name must be a string',
        }),
        code: z.enum([...AcademicSemesterCode] as [string, ...string[]], {
            required_error: 'Code is required',
            invalid_type_error: 'Code must be a string',
        }),
        year: z.string({
            required_error: 'Year is required',
            invalid_type_error: 'Year must be a string',
        }),
        startMonth: z.enum([...Months] as [string, ...string[]], {
            required_error: 'Start month is required',
            invalid_type_error: 'Start month must be a string',
        }),
        endMonth: z.enum([...Months] as [string, ...string[]], {
            required_error: 'End month is required',
            invalid_type_error: 'End month must be a string',
        }),
    })
});

export const academicSemesterValidation = {
  createAcademicSemesterValidation: academicSemesterValidationSchema
};
