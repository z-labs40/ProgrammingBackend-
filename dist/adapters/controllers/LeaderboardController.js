"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardController = void 0;
const StudentUseCase_1 = require("../../application/use-cases/StudentUseCase");
class LeaderboardController {
    studentUseCase;
    constructor() {
        this.studentUseCase = new StudentUseCase_1.StudentUseCase();
    }
    getLeaderboard = async (req, res) => {
        try {
            const leaderboard = await this.studentUseCase.getLeaderboard();
            res.json(leaderboard);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}
exports.LeaderboardController = LeaderboardController;
