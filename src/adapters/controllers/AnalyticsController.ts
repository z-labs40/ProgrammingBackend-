import { Request, Response } from "express";
import { AnalyticsUseCase } from "../../application/use-cases/AnalyticsUseCase";

export class AnalyticsController {
  private analyticsUseCase: AnalyticsUseCase;

  constructor() {
    this.analyticsUseCase = new AnalyticsUseCase();
  }

  getPerformanceData = async (req: Request, res: Response) => {
    try {
      const data = await this.analyticsUseCase.getPerformanceData();
      res.json(data);
    } catch (error) {
      console.error("Error fetching performance data:", error);
      res.status(500).json({ error: error instanceof Error ? error.message : "Internal Server Error", stack: error instanceof Error ? error.stack : undefined });
    }
  };

  getSummaryStats = async (req: Request, res: Response) => {
    try {
      const data = await this.analyticsUseCase.getSummaryStats();
      res.json(data);
    } catch (error) {
      console.error("Error fetching summary stats:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
