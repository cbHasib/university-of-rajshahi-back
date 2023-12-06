import createHttpError from "http-errors";
import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";
import { AcademicFaculty } from "../academicFaculty/academicFaculty.model";

const createAcademicDepartmentIntoDB = async (academicDepartment: TAcademicDepartment) => {

    const academicFaculty = await AcademicFaculty.findById(academicDepartment.academicFaculty);
    if (!academicFaculty) {
        throw createHttpError.NotFound('Academic Faculty not found');
    }

    const department = await AcademicDepartment.findOne({ name: academicDepartment.name });
    if (department) {
        throw createHttpError.Conflict(`${academicDepartment.name} already exists`);
    }

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
        throw createHttpError.NotFound('Academic Department not found');
    }
    return academicDepartment;
}

const updateAcademicDepartmentByIdFromDB = async (id: string, academicDepartment: TAcademicDepartment) => {
    // check if academic faculty exists and also check if department exists
    if (academicDepartment.academicFaculty) {
        const academicFaculty = await AcademicFaculty.findById(academicDepartment.academicFaculty);
        if (!academicFaculty) {
            throw createHttpError.NotFound('Academic Faculty not found');
        }
    }

    const department = await AcademicDepartment.findById(id);
    if (!department) {
        throw createHttpError.NotFound('Academic Department not found');
    }

    department.name = academicDepartment.name || department.name;
    department.academicFaculty = academicDepartment.academicFaculty || department.academicFaculty;
    department.save();
    return department;
}




export const academicDepartmentService = {
    createAcademicDepartmentIntoDB,
    getAcademicDepartmentsFromDB,
    getAcademicDepartmentByIdFromDB,
    updateAcademicDepartmentByIdFromDB
}