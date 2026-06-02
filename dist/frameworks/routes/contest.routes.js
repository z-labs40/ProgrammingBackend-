import { Router } from "express";
import { ContestController } from "../../adapters/controllers/ContestController";
const router = Router();
const contestController = new ContestController();
router.get("/", contestController.getAllContests);
export default router;
