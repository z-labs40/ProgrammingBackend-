import { AppDataSource } from "../../infrastructure/database";
import { SolvedProblem } from "../../adapters/models/SolvedProblem";
import { User, UserRole } from "../../adapters/models/User";
import { Contest } from "../../adapters/models/Contest";

export class AnalyticsUseCase {
  async getPerformanceData() {
    const solvedProblemRepo = AppDataSource.getRepository(SolvedProblem);
    
    // Fetch all solved problems with their associated problem details
    const solvedProblems = await solvedProblemRepo.find({
      relations: { problem: true },
    });

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
    // Initialize empty aggregated data for each month
    const aggregatedData = months.map(month => ({
      name: month,
      leetcode: 0,
      codeforces: 0,
      hackerrank: 0,
    }));

    // Group by month and platform
    for (const solved of solvedProblems) {
      if (!solved.problem || !solved.solvedAt) continue;

      const monthIndex = solved.solvedAt.getMonth(); // 0-11
      const platform = solved.problem.platform;

      if (platform === "LEETCODE") {
        aggregatedData[monthIndex].leetcode += 1;
      } else if (platform === "CODEFORCES") {
        aggregatedData[monthIndex].codeforces += 1;
      } else if (platform === "HACKERRANK") {
        aggregatedData[monthIndex].hackerrank += 1;
      }
    }

    return aggregatedData;
  }

  async getSummaryStats() {
    const userRepo = AppDataSource.getRepository(User);
    const solvedProblemRepo = AppDataSource.getRepository(SolvedProblem);
    const contestRepo = AppDataSource.getRepository(Contest);

    const totalCoders = await userRepo.count({ where: { role: UserRole.STUDENT } });
    const problemsSolved = await solvedProblemRepo.count();
    const activeContests = await contestRepo.count(); // Could filter by upcoming/recent

    // Calculate average rating
    const users = await userRepo.find({ where: { role: UserRole.STUDENT } });
    const avgRating = users.length > 0
      ? Math.round(users.reduce((sum, user) => sum + (user.rating || 0), 0) / users.length)
      : 0;

    return {
      totalCoders,
      problemsSolved,
      activeContests,
      avgRating
    };
  }
}
