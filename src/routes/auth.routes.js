import { Router } from "express";
import {
  login,
  registerStudent,
  registerTeacher,
} from "../controllers/auth.controller.js";
import { verifyRoles } from "../middlewares/roles.middleware.js";

const router = Router();

router.post("/login", login);
router.post("/register-teacher", verifyRoles([1]), registerTeacher);
router.post("/register-student", verifyRoles([1]), registerStudent);

export default router;
