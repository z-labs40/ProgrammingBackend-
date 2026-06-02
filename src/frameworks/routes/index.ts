import { Router } from "express";
import studentRoutes from "./student.routes";
import problemRoutes from "./problem.routes";
import contestRoutes from "./contest.routes";
import leaderboardRoutes from "./leaderboard.routes";

import authRoutes from "./auth.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/students", studentRoutes);
router.use("/problems", problemRoutes);
router.use("/contests", contestRoutes);
router.use("/leaderboard", leaderboardRoutes);

export default router;
