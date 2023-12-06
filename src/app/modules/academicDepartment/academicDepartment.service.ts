import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createAcademicDepartmentIntoDB = async (academicDepartment: TAcademicDepartment) => {
    const newAcademicDepartment = await AcademicDepartment.create(academicDepartment);
    return newAcademicDepartment;
}

const getAcademicDepartmentsFromDB = async () => {
    const academicFaculties = await AcademicDepartment.find().populate('academicFaculty', 'name')
        .sort({ createdAt: -1 });
    return academicFaculties;
}

const getAcademicDepartmentByIdFromDB = async (id: string) => {
    const academicDepartment = await AcademicDepartment.findById(id).populate('academicFaculty', 'name');

    if (!academicDepartment) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academic department does not exist')
    }
    return academicDepartment;
}

const updateAcademicDepartmentByIdFromDB = async (id: string, academicDepartment: TAcademicDepartment) => {
    // check if academic faculty exists and also check if department exists
    if (academicDepartment.academicFaculty) {
        const academicFaculty = await AcademicFaculty.findById(academicDepartment.academicFaculty);
        if (!academicFaculty) {
            throw new AppError(httpStatus.NOT_FOUND, 'Academic Faculty not found');
        }
    }

    const department = await AcademicDepartment.findByIdAndUpdate(id, academicDepartment, { new: true });
    return department;
}



export const academicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAcademicDepartmentsFromDB,
    getAcademicDepartmentByIdFromDB,
    updateAcademicDepartmentByIdFromDB
}