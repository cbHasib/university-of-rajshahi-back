import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import httpStatus from "http-status";
import AppError from "../../errors/AppError";

const academicDepartmentSchema = new Schema<TAcademicDepartment>({
    name: {
        type: String,
        required: [true, 'Name is required'],
        unique: true,
        trim: true
    },
    academicFaculty: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
        required: [true, 'Academic Faculty is required']
    }
}, {
    timestamps: true
})




academicDepartmentSchema.pre<TAcademicDepartment>('save', async function (next) {
    const isDepartmentNameExist = await AcademicDepartment.findOne({ name: this.name });
    if (isDepartmentNameExist) {
        throw new AppError(httpStatus.CONFLICT, `${this.name} already exists`);
    }

    if(this.academicFaculty){
        const isAcademicFacultyExist = await AcademicFaculty.findById(this.academicFaculty);
        if(!isAcademicFacultyExist){
            throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
        }
    }

    next();
});


// Update
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();

    const isDepartmentExist = await AcademicDepartment.findOne(query);
    if (!isDepartmentExist) {
        throw new AppError(httpStatus.NOT_FOUND, 'This department does not exist');
    }
    
    next();
});

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);