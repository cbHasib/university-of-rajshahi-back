import express from "express";
import { academicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicSemesterValidation } from "./academicSemester.validation";

const router = express.Router();

router.post("/create-academic-semester", validateRequest(academicSemesterValidation.createAcademicSemesterValidation), academicSemesterController.createAcademicSemester);

export const academicSemesterRoutes = router;