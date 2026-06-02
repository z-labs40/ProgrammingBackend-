import { Router } from "express";
import { ContestController } from "../../adapters/controllers/ContestController";

const router = Router();
const contestController = new ContestController();

router.get("/", contestController.getAllContests);
router.post("/", contestController.createContest);

export default router;
