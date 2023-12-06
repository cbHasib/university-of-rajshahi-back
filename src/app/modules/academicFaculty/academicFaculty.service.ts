import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createAcademicFacultyIntoDB = async (academicFaculty:TAcademicFaculty) => {
    const newAcademicFaculty = await AcademicFaculty.create(academicFaculty);
    return newAcademicFaculty;
}

const getAcademicFacultiesFromDB = async () => {
    const academicFaculties = await AcademicFaculty.find().sort({createdAt: -1});
    return academicFaculties;
}

const getAcademicFacultyByIdFromDB = async (id:string) => {
    const academicFaculty = await AcademicFaculty.findById(id);
    if (!academicFaculty) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academic faculty does not exist')
    }
    return academicFaculty;
}

const updateAcademicFacultyByIdFromDB = async (id:string, academicFaculty:TAcademicFaculty) => {
    const updatedContent = await AcademicFaculty.findOneAndUpdate({_id: id}, academicFaculty, {new: true});
    if (!updatedContent) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academic faculty does not exist')
    }
    return updatedContent;
}




export const academicFacultyService = {
    createAcademicFacultyIntoDB,
    getAcademicFacultiesFromDB,
    getAcademicFacultyByIdFromDB,
    updateAcademicFacultyByIdFromDB
}