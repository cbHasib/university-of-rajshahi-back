import { TStudent } from './student.interface';
import { Student } from './student.model';

const getStudentsFromDB = async () => {
  const result = await Student.find();
  return result;
};

const getSingleStudentFromDB = async (studentId: string) => {
  const result = await Student.find({ id: studentId });
  return result;
};

const deleteStudentFromDB = async (studentId: string) => {
  const result = await Student.updateOne({ id: studentId }, { isDeleted: true });
  return result;
}


export const StudentServices = {
  getStudentsFromDB,
  getSingleStudentFromDB,
  deleteStudentFromDB,
};
