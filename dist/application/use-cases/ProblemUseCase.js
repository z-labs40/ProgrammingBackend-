"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemUseCase = void 0;
const ProblemRepository_1 = require("../../adapters/repositeries/ProblemRepository");
const UserRepository_1 = require("../../adapters/repositeries/UserRepository");
class ProblemUseCase {
    problemRepository;
    userRepository;
    constructor() {
        this.problemRepository = new ProblemRepository_1.ProblemRepository();
        this.userRepository = new UserRepository_1.UserRepository();
    }
    async getAllProblems() {
        return this.problemRepository.findAll();
    }
    async solveProblem(userId, problemId) {
        const problem = await this.problemRepository.findById(problemId);
        if (!problem) {
            throw new Error("Problem not found");
        }
        const hasSolved = await this.problemRepository.hasUserSolvedProblem(userId, problemId);
        if (hasSolved) {
            throw new Error("Problem already solved by this user");
        }
        // 1. Mark as solved
        await this.problemRepository.markAsSolved(userId, problemId);
        // 2. Increase user's score
        await this.userRepository.incrementScore(userId, problem.points);
        // 3. Create timeline event
        await this.userRepository.createTimelineEvent(userId, `Solved ${problem.title}`, "Target", "text-green-500");
        const updatedUser = await this.userRepository.findStudentById(userId);
        return { success: true, userScore: updatedUser?.score };
    }
}
exports.ProblemUseCase = ProblemUseCase;
