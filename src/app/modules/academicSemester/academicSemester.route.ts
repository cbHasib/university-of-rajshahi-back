import express from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post("/create-academic-semester", validateRequest(academicSemesterValidation.createAcademicSemesterValidation), academicSemesterController.createAcademicSemester);

router.get("/", academicSemesterController.getAcademicSemesters);
router.get("/:semesterId", academicSemesterController.getAcademicSemesterById);
router.patch("/:semesterId",validateRequest(academicSemesterValidation.updateAcademicSemesterValidation), academicSemesterController.updateAcademicSemesterById);

export const academicSemesterRoutes = router;