import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async (year:string, code:string) => {
  // Last student
  const lastStudent = await User.findOne(
    {
      role: 'student',
      // check 6 first characters of id (year + code) // regext should not be used to check last 4 characters
      id: { $regex: `^${year}${code}` },
    },
    {
      id: 1,
      _id: 0,
    },
  ).sort({ createdAt: -1 }).lean();

  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

export const generateStudentId = async(payload: TAcademicSemester) => {
    // First time student id (0000)
  const currentId = await findLastStudentId(payload.year, payload.code) || (0).toString().padStart(4, '0');

  let incrementedId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementedId = `${payload.year}${payload.code}${incrementedId}`;

  return incrementedId;
};
