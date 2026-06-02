import { Request, Response } from "express";
import { ProblemUseCase } from "../../application/use-cases/ProblemUseCase";

export class ProblemController {
  private problemUseCase: ProblemUseCase;

  constructor() {
    this.problemUseCase = new ProblemUseCase();
  }

  getAllProblems = async (req: Request, res: Response) => {
    try {
      const problems = await this.problemUseCase.getAllProblems();
      res.json(problems);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  createProblem = async (req: Request, res: Response) => {
    try {
      const { title, url, link, difficulty, platform, points } = req.body;
      const sanitizedData = {
        title,
        link: link || url,
        difficulty: difficulty ? difficulty.toUpperCase() : "EASY",
        platform: platform ? platform.toUpperCase() : "LEETCODE",
        points: points || 0
      };
      const problem = await this.problemUseCase.createProblem(sanitizedData);
      res.status(201).json(problem);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  };

  solveProblem = async (req: Request, res: Response) => {
    try {
      const { userId, problemId } = req.body;
      if (!userId || !problemId) {
        return res.status(400).json({ error: "userId and problemId are required" });
      }
      const result = await this.problemUseCase.solveProblem(userId, problemId);
      res.json(result);
    } catch (error: any) {
      console.error(error);
      if (error.message === "Problem not found" || error.message === "Problem already solved by this user") {
        return res.status(400).json({ error: error.message });
      }
      res.status(500).json({ error: "Internal Server Error" });
    }
  };
}
