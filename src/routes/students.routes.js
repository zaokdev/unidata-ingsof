import express from "express";
import {
  dismissStudent,
  getAllStudents,
  modifyStudentData,
} from "../controllers/students.controller.js";
import { verifyRoles } from "../middlewares/roles.middleware.js";

const router = express.Router();

router.get("/all-students", verifyRoles([1, 2]), getAllStudents);
router.put("/modify-student-data/:id", verifyRoles([1]), modifyStudentData);
router.delete("/dismiss-student/:id", verifyRoles([1]), dismissStudent);

export default router;
