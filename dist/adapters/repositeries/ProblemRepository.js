"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemRepository = void 0;
const database_1 = require("../../infrastructure/database");
const Problem_1 = require("../models/Problem");
const SolvedProblem_1 = require("../models/SolvedProblem");
class ProblemRepository {
    problemRepo = database_1.AppDataSource.getRepository(Problem_1.Problem);
    solvedProblemRepo = database_1.AppDataSource.getRepository(SolvedProblem_1.SolvedProblem);
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
exports.ProblemRepository = ProblemRepository;
