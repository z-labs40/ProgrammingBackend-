import { ContestRepository } from "../../adapters/repositeries/ContestRepository";
export class ContestUseCase {
    contestRepository;
    constructor() {
        this.contestRepository = new ContestRepository();
    }
    async getAllContests(type) {
        return this.contestRepository.findAll(type);
    }
}
