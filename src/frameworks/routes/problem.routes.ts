import { Router } from "express";
import { ProblemController } from "../../adapters/controllers/ProblemController";

const router = Router();
const problemController = new ProblemController();

router.get("/", problemController.getAllProblems);
router.post("/", problemController.createProblem);
router.post("/solve", problemController.solveProblem);

export default router;
