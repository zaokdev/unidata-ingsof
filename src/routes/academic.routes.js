import { Router } from "express";
import { verifyRoles } from "../middlewares/roles.middleware.js";
import {
  createSubject,
  getStudentClasses,
  getTeacherClasses,
  registerForTheClass,
} from "../controllers/academic.controller.js";

const router = Router();

router.post("/create-subject", verifyRoles([1]), createSubject);
router.post("/register-to-class", verifyRoles([3]), registerForTheClass);
router.get("/teacher/get-classes", verifyRoles([2]), getTeacherClasses);
router.get("/get-classes", verifyRoles([1, 3]), getStudentClasses);

export default router;
