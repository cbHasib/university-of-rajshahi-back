import express from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidation } from "./academicSemester.validation";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/create-academic-semester", auth('admin'), validateRequest(academicSemesterValidation.createAcademicSemesterValidation), academicSemesterController.createAcademicSemester);

router.get("/", auth('admin'), academicSemesterController.getAcademicSemesters);
router.get("/:semesterId", academicSemesterController.getAcademicSemesterById);
router.patch("/:semesterId",validateRequest(academicSemesterValidation.updateAcademicSemesterValidation), academicSemesterController.updateAcademicSemesterById);

export const academicSemesterRoutes = router;