"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProblemController = void 0;
const ProblemUseCase_1 = require("../../application/use-cases/ProblemUseCase");
class ProblemController {
    problemUseCase;
    constructor() {
        this.problemUseCase = new ProblemUseCase_1.ProblemUseCase();
    }
    getAllProblems = async (req, res) => {
        try {
            const problems = await this.problemUseCase.getAllProblems();
            res.json(problems);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
    solveProblem = async (req, res) => {
        try {
            const { userId, problemId } = req.body;
            if (!userId || !problemId) {
                return res.status(400).json({ error: "userId and problemId are required" });
            }
            const result = await this.problemUseCase.solveProblem(userId, problemId);
            res.json(result);
        }
        catch (error) {
            console.error(error);
            if (error.message === "Problem not found" || error.message === "Problem already solved by this user") {
                return res.status(400).json({ error: error.message });
            }
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}
exports.ProblemController = ProblemController;
