"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContestUseCase = void 0;
const ContestRepository_1 = require("../../adapters/repositeries/ContestRepository");
class ContestUseCase {
    contestRepository;
    constructor() {
        this.contestRepository = new ContestRepository_1.ContestRepository();
    }
    async getAllContests(type) {
        return this.contestRepository.findAll(type);
    }
}
exports.ContestUseCase = ContestUseCase;
