import { Router } from "express";
import { StudentController } from "../../adapters/controllers/StudentController";
const router = Router();
const studentController = new StudentController();
router.get("/", studentController.getAllStudents);
router.post("/", studentController.createStudent);
router.get("/:id", studentController.getStudentProfile);
router.put("/:id", studentController.updateStudentProfile);
export default router;
