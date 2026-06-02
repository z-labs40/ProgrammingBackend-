"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestController = void 0;
const ContestUseCase_1 = require("../../application/use-cases/ContestUseCase");
class ContestController {
    contestUseCase;
    constructor() {
        this.contestUseCase = new ContestUseCase_1.ContestUseCase();
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
exports.ContestController = ContestController;
