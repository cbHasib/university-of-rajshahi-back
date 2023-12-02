import { Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.const";

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {
        type: String,
        enum: AcademicSemesterName,
        required: [true, 'Name is required'],
        trim: true
    },
    code: {
        type: String,
        enum: AcademicSemesterCode,
        required: [true, 'Code is required'],
        trim: true
    },
    year: {
        type: String,
        required: [true, 'Year is required'],
    },
    startMonth: {
        type: String,
        enum: Months,
        required: [true, 'Start month is required'],
        trim: true
    },
    endMonth: {
        type: String,
        enum: Months,
        required: [true, 'End month is required'],
        trim: true
    }
});


academicSemesterSchema.pre<TAcademicSemester>('save', async function (next) {

    const ifSemesterAlreadyExist = await AcademicSemester.findOne({ 
        name: this.name, 
        year: this.year 
    });

    if (ifSemesterAlreadyExist) {
        throw new Error('Semester already exist!');
    }

    next();
});

export const AcademicSemester = model<TAcademicSemester>('AcademicSemester', academicSemesterSchema);