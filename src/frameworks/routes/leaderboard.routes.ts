import { Router } from "express";
import { LeaderboardController } from "../../adapters/controllers/LeaderboardController";

const router = Router();
const leaderboardController = new LeaderboardController();

router.get("/", leaderboardController.getLeaderboard);

export default router;
