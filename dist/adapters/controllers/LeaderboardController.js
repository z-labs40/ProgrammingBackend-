import { StudentUseCase } from "../../application/use-cases/StudentUseCase";
export class LeaderboardController {
    studentUseCase;
    constructor() {
        this.studentUseCase = new StudentUseCase();
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
