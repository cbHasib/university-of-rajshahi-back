import createHttpError from "http-errors";
import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

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
        throw createHttpError.NotFound('Academic Faculty not found');
    }
    return academicFaculty;
}

const updateAcademicFacultyByIdFromDB = async (id:string, academicFaculty:TAcademicFaculty) => {
    const updatedContent = await AcademicFaculty.findOneAndUpdate({_id: id}, academicFaculty, {new: true});
    if (!updatedContent) {
        throw createHttpError.NotFound('Academic Faculty not found');
    }
    return updatedContent;
}




export const academicFacultyService = {
    createAcademicFacultyIntoDB,
    getAcademicFacultiesFromDB,
    getAcademicFacultyByIdFromDB,
    updateAcademicFacultyByIdFromDB
}