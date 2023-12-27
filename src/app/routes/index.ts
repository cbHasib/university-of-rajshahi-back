import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { StudentRoutes } from "../modules/Student/student.route";
import { academicSemesterRoutes } from "../modules/academicSemester/academicSemester.route";
import { academicFacultyRoutes } from "../modules/academicFaculty/academicFaculty.route";
import { academicDepartmentRoutes } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CourseRoutes } from "../modules/Course/course.route";
import { offeredCourseRoutes } from "../modules/OfferedCourse/OfferedCourse.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router();

const moduleRoutes = [
    {
        path: "/auth",
        route: AuthRoutes
    },
    {
        path: "/users",
        route: UserRoutes
    },
    {
        path: "/students",
        route: StudentRoutes
    },
    {
        path: "/faculties",
        route: FacultyRoutes
    },
    {
        path: "/admins",
        route: AdminRoutes
    },
    {
        path: "/academic-semesters",
        route: academicSemesterRoutes
    },
    {
        path: "/academic-faculties",
        route: academicFacultyRoutes
    },
    {
        path: "/academic-departments",
        route: academicDepartmentRoutes
    },
    {
        path: "/courses",
        route: CourseRoutes
    },
    {
        path: "/offered-courses",
        route: offeredCourseRoutes
    },
    {
        path: "/semester-registrations",
        route: semesterRegistrationRoutes
    }
]

moduleRoutes.forEach(route =>  router.use(`${route.path}`, route.route))

export default router;