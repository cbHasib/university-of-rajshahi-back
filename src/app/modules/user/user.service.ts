import config from "../../config";
import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";

const createStudentIntoDB = async (password : string, studentData: TStudent) => {

    // create a user object
    const userData : Partial<TUser> = {};
    // Set student role
    userData.role = 'student';
  
    // If password is not provided, set it to default password
    userData.password = password || (config.default_password as string);    

    // Find academic semester
    const academicSemester = await AcademicSemester.findById(studentData.admissionSemester);
    
    // Set student id (Manually)
    userData.id = await generateStudentId(academicSemester as TAcademicSemester);

    // Create a new user
    const newUser = await User.create(userData); 
    // Create a new student
    if(Object.keys(newUser).length){
        // Set student id, _id as user id
        studentData.id = newUser?.id ;
        studentData.user = newUser._id;
        // Create a new student
        const newStudent = await Student.create(studentData);
        return newStudent;
    }

    return null;
  };



export const UserServices = {
    createStudentIntoDB,
};
  