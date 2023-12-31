import { academicSemesterNameCodeMapper } from "./academicSemester.const";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const createAcademicSemesterIntoDB = async (academicSemesterData : TAcademicSemester) => {

    if(academicSemesterNameCodeMapper[academicSemesterData.name] !== academicSemesterData.code) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
    }

    const academicSemesterCreated = await AcademicSemester.create(academicSemesterData);
    return academicSemesterCreated;
}


const getAcademicSemestersFromDB = async () => {
    const academicSemesters = await AcademicSemester.find();
    return academicSemesters;
}

const getAcademicSemesterByIdFromDB = async (academicSemesterId: string) => {
    const academicSemester = await AcademicSemester.findById(academicSemesterId);
    return academicSemester;
}

const updateAcademicSemesterByIdFromDB = async (academicSemesterId: string, academicSemesterData: Partial<TAcademicSemester>) => {

    const academicSemester = await AcademicSemester.findById(academicSemesterId);

    if(!academicSemester) {
        throw new AppError(httpStatus.NOT_FOUND, 'Academic semester not found');
    }

    if(academicSemesterData.name && academicSemesterData.code) {
        if(academicSemesterNameCodeMapper[academicSemesterData.name] !== academicSemesterData.code) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Invalid semester code!');
        }
    } else if(academicSemesterData.name) {
       if(academicSemesterNameCodeMapper[academicSemesterData.name] !== academicSemester.code) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Invalid semester code for this semester name!');
        }
    } else if(academicSemesterData.code) {
        if(academicSemesterNameCodeMapper[academicSemester.name] !== academicSemesterData.code) {
            throw new AppError(httpStatus.BAD_REQUEST, 'Invalid semester code for this semester name!');
        }
    }
   
    const updatedData = await AcademicSemester.findByIdAndUpdate(academicSemesterId, academicSemesterData, { new: true });
    return updatedData;
}


export const academicSemesterService = {
    createAcademicSemesterIntoDB,
    getAcademicSemestersFromDB,
    getAcademicSemesterByIdFromDB,
    updateAcademicSemesterByIdFromDB
}