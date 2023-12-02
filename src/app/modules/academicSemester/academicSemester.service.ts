import { academicSemesterNameCodeMapper } from "./academicSemester.const";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

const createAcademicSemesterIntoDB = async (academicSemesterData : TAcademicSemester) => {

    if(academicSemesterNameCodeMapper[academicSemesterData.name] !== academicSemesterData.code) {
        throw new Error('Invalid semester code!');
    }

    const academicSemesterCreated = await AcademicSemester.create(academicSemesterData);
    return academicSemesterCreated;
}

export const academicSemesterService = {
    createAcademicSemesterIntoDB
}