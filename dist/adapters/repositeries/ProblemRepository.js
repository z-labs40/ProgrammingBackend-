import { AppDataSource } from "../../infrastructure/database";
import { Problem } from "../models/Problem";
import { SolvedProblem } from "../models/SolvedProblem";
export class ProblemRepository {
    problemRepo = AppDataSource.getRepository(Problem);
    solvedProblemRepo = AppDataSource.getRepository(SolvedProblem);
    async findAll() {
        return this.problemRepo.find();
    }
    async findById(id) {
        return this.problemRepo.findOne({ where: { id } });
    }
    async hasUserSolvedProblem(userId, problemId) {
        const existing = await this.solvedProblemRepo.findOne({ where: { userId, problemId } });
        return !!existing;
    }
    async markAsSolved(userId, problemId) {
        const solved = this.solvedProblemRepo.create({ userId, problemId });
        return this.solvedProblemRepo.save(solved);
    }
}
