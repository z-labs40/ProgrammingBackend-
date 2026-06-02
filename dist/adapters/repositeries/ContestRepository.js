import { AppDataSource } from "../../infrastructure/database";
import { Contest } from "../models/Contest";
export class ContestRepository {
    contestRepo = AppDataSource.getRepository(Contest);
    async findAll(type) {
        let whereClause = {};
        if (type) {
            whereClause = { type };
        }
        return this.contestRepo.find({
            where: whereClause,
            order: { date: "DESC" },
        });
    }
}
