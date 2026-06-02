import { AppDataSource } from "../../infrastructure/database";
import { Contest, ContestType } from "../models/Contest";

export class ContestRepository {
  private contestRepo = AppDataSource.getRepository(Contest);

  async findAll(type?: ContestType) {
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
