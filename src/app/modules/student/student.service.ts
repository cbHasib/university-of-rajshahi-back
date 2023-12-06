import { TStudent } from './student.interface';
import { Student } from './student.model';

const getStudentsFromDB = async () => {
  const result = await Student.find()
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      select: 'name',
      populate: {
        path: 'academicFaculty',
        select: 'name',
      },
    })
    .sort({ createdAt: -1 });
  return result;
};

const getSingleStudentFromDB = async (studentId: string) => {
  const result = await Student.find({ id: studentId }).populate('admissionSemester')
  .populate({
    path: 'academicDepartment',
    select: 'name',
    populate: {
      path: 'academicFaculty',
      select: 'name',
    },
  });
  return result;
};

const updateStudentIntoDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
    guardain: {
      fatherOccupation:"Teacher"
    }

    guardian.fatherOccupation = Teacher

    name.firstName = 'Mezba'
    name.lastName = 'Abedin'
  */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  const result = await Student.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (studentId: string) => {
  const result = await Student.updateOne(
    { id: studentId },
    { isDeleted: true },
  );
  return result;
};

export const StudentServices = {
  getStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentIntoDB,
  deleteStudentFromDB,
};
