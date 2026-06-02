import { ContestRepository } from "../../adapters/repositeries/ContestRepository";
import { ContestType } from "../../adapters/models/Contest";

export class ContestUseCase {
  private contestRepository: ContestRepository;

  constructor() {
    this.contestRepository = new ContestRepository();
  }

  async getAllContests(type?: string) {
    return this.contestRepository.findAll(type as ContestType);
  }

  async createContest(data: any) {
    return this.contestRepository.create(data);
  }
}
