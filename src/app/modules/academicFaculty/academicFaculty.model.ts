import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const academicFacultySchema = new Schema<TAcademicFaculty>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true
    }
}, {
    timestamps: true
})

academicFacultySchema.pre<TAcademicFaculty>('save', async function (next) {
    const isNameExist = await AcademicFaculty.findOne({ name: this.name });
    if (isNameExist) {
        throw new AppError(httpStatus.CONFLICT, `${this.name} already exists`);
    }
    next();
});


export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema);