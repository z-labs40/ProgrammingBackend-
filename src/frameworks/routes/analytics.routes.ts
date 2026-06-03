import { Router } from "express";
import { AnalyticsController } from "../../adapters/controllers/AnalyticsController";

const router = Router();
const analyticsController = new AnalyticsController();

router.get("/performance", analyticsController.getPerformanceData);
router.get("/summary", analyticsController.getSummaryStats);

export default router;
