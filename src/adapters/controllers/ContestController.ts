import { Request, Response } from "express";
import { ContestUseCase } from "../../application/use-cases/ContestUseCase";

export class ContestController {
  private contestUseCase: ContestUseCase;

  constructor() {
    this.contestUseCase = new ContestUseCase();
  }

  getAllContests = async (req: Request, res: Response) => {
    try {
      const { type } = req.query;
      const contests = await this.contestUseCase.getAllContests(type as string);
      res.json(contests);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createContest = async (req: Request, res: Response) => {
    try {
      const { name, platform, date, url, link, type } = req.body;
      const sanitizedData = {
        name,
        platform,
        date: new Date(date),
        link: link || url,
        type: type ? type.toUpperCase() : "UPCOMING",
        registeredCount: 0
      };
      const contest = await this.contestUseCase.createContest(sanitizedData);
      res.status(201).json(contest);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
