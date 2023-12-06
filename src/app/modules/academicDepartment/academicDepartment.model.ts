import { Schema, model } from "mongoose";
import { TAcademicDepartment } from "./academicDepartment.interface";

const academicDepartmentModel = new Schema<TAcademicDepartment>({
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

export const AcademicDepartment = model<TAcademicDepartment>('AcademicDepartment', academicDepartmentModel);