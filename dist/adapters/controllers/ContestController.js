import { ContestUseCase } from "../../application/use-cases/ContestUseCase";
export class ContestController {
    contestUseCase;
    constructor() {
        this.contestUseCase = new ContestUseCase();
    }
    getAllContests = async (req, res) => {
        try {
            const { type } = req.query;
            const contests = await this.contestUseCase.getAllContests(type);
            res.json(contests);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}
