import { ProblemRepository } from "../../adapters/repositeries/ProblemRepository";
import { UserRepository } from "../../adapters/repositeries/UserRepository";

export class ProblemUseCase {
  private problemRepository: ProblemRepository;
  private userRepository: UserRepository;

  constructor() {
    this.problemRepository = new ProblemRepository();
    this.userRepository = new UserRepository();
  }

  async getAllProblems() {
    return this.problemRepository.findAll();
  }

  async createProblem(data: any) {
    return this.problemRepository.create(data);
  }

  async solveProblem(userId: string, problemId: string) {
    const problem = await this.problemRepository.findById(problemId);
    if (!problem) {
      throw new Error("Problem not found");
    }

    const hasSolved = await this.problemRepository.hasUserSolvedProblem(userId, problemId);
    if (hasSolved) {
      throw new Error("Problem already solved by this user");
    }

    // 1. Mark as solved
    await this.problemRepository.markAsSolved(userId, problemId);

    // 2. Increase user's score
    await this.userRepository.incrementScore(userId, problem.points);

    // 3. Create timeline event
    await this.userRepository.createTimelineEvent(
      userId,
      `Solved ${problem.title}`,
      "Target",
      "text-green-500"
    );

    const updatedUser = await this.userRepository.findStudentById(userId);
    return { success: true, userScore: updatedUser?.score };
  }
}
