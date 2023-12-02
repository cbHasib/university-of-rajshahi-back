import config from "../../config";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";

const createStudentIntoDB = async (password : string, studentData: TStudent) => {

    // create a user object
    const userData : Partial<TUser> = {};
    // Set student role
    userData.role = 'student';
  
    // If password is not provided, set it to default password
    userData.password = password || (config.default_password as string);    
    
    // Set student id (Manually)
    userData.id = '202301001'

    // Create a new user
    const newUser = await User.create(userData); 
console.log(newUser);
    // Create a new student
    if(Object.keys(newUser).length){
        // Set student id, _id as user id
        console.log(newUser.id);
        studentData.id = newUser?.id ;
        studentData.user = newUser._id;
        console.log(studentData);
        // Create a new student
        const newStudent = await Student.create(studentData);
        return newStudent;
    }

    return null;
  };

export const UserServices = {
    createStudentIntoDB,
};
  