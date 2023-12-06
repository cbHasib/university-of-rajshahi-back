import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";
import createHttpError from "http-errors";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";

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
        throw createHttpError.Conflict(`${this.name} already exists`);
    }

    if(this.academicFaculty){
        const isAcademicFacultyExist = await AcademicFaculty.findById(this.academicFaculty);
        if(!isAcademicFacultyExist){
            throw createHttpError.NotFound('Academic Faculty not found');
        }
    }

    next();
});


// Update
academicDepartmentSchema.pre('findOneAndUpdate', async function (next) {
    const query = this.getQuery();

    const isDepartmentExist = await AcademicDepartment.findOne(query);
    if (!isDepartmentExist) {
        throw createHttpError.NotFound('This department does not exist');
    }
    
    next();
});

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentSchema);