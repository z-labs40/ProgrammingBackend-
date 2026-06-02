import { Request, Response } from "express";
import { StudentUseCase } from "../../application/use-cases/StudentUseCase";

export class LeaderboardController {
  private studentUseCase: StudentUseCase;

  constructor() {
    this.studentUseCase = new StudentUseCase();
  }

  getLeaderboard = async (req: Request, res: Response) => {
    try {
      const leaderboard = await this.studentUseCase.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
