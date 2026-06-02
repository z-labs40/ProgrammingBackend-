import { Router } from "express";
import { AuthController } from "../../adapters/controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.post("/student/signup", authController.studentSignup);
router.post("/student/login", authController.studentLogin);
router.post("/admin/login", authController.adminLogin);

export default router;
