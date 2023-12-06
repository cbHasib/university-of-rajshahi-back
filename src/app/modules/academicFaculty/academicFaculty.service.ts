import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (academicFaculty:TAcademicFaculty) => {
    const newAcademicFaculty = AcademicFaculty.create(academicFaculty);
    return newAcademicFaculty;
}

const getAcademicFacultiesFromDB = async () => {
    const academicFaculties = AcademicFaculty.find().sort({createdAt: -1});
    return academicFaculties;
}

const getAcademicFacultyByIdFromDB = async (id:string) => {
    const academicFaculty = AcademicFaculty.findById(id);
    return academicFaculty;
}

const updateAcademicFacultyByIdFromDB = async (id:string, academicFaculty:TAcademicFaculty) => {
    const updatedContent = await AcademicFaculty.findOneAndUpdate({_id: id}, academicFaculty, {new: true});
    return updatedContent;
}




export const academicFacultyService = {
    createAcademicFacultyIntoDB,
    getAcademicFacultiesFromDB,
    getAcademicFacultyByIdFromDB,
    updateAcademicFacultyByIdFromDB
}