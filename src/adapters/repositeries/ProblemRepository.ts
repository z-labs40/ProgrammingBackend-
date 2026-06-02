import { AppDataSource } from "../../infrastructure/database";
import { Problem } from "../models/Problem";
import { SolvedProblem } from "../models/SolvedProblem";

export class ProblemRepository {
  private problemRepo = AppDataSource.getRepository(Problem);
  private solvedProblemRepo = AppDataSource.getRepository(SolvedProblem);

  async findAll() {
    return this.problemRepo.find();
  }

  async findById(id: string) {
    return this.problemRepo.findOne({ where: { id } });
  }

  async create(data: Partial<Problem>) {
    const problem = this.problemRepo.create(data);
    return this.problemRepo.save(problem);
  }

  async hasUserSolvedProblem(userId: string, problemId: string) {
    const existing = await this.solvedProblemRepo.findOne({ where: { userId, problemId } });
    return !!existing;
  }

  async markAsSolved(userId: string, problemId: string) {
    const solved = this.solvedProblemRepo.create({ userId, problemId });
    return this.solvedProblemRepo.save(solved);
  }
}
