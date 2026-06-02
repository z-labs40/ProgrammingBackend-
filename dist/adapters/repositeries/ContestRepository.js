"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestRepository = void 0;
const database_1 = require("../../infrastructure/database");
const Contest_1 = require("../models/Contest");
class ContestRepository {
    contestRepo = database_1.AppDataSource.getRepository(Contest_1.Contest);
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
exports.ContestRepository = ContestRepository;
