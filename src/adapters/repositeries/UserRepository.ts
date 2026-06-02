import { AppDataSource } from "../../infrastructure/database";
import { User, UserRole } from "../models/User";
import { PlatformAccounts } from "../models/PlatformAccounts";
import { TimelineEvent } from "../models/TimelineEvent";

export class UserRepository {
  private userRepo = AppDataSource.getRepository(User);
  private platformRepo = AppDataSource.getRepository(PlatformAccounts);
  private timelineRepo = AppDataSource.getRepository(TimelineEvent);

  async findAllStudents() {
    return this.userRepo.find({
      where: { role: UserRole.STUDENT },
      relations: { platformAccounts: true },
    });
  }

  async findByEmail(email: string) {
    return this.userRepo.findOne({
      where: { email },
    });
  }

  async createStudent(data: Partial<User>) {
    const platformAccounts = new PlatformAccounts();
    const newStudent = this.userRepo.create({
      ...data,
      role: UserRole.STUDENT,
      platformAccounts,
    });
    return this.userRepo.save(newStudent);
  }

  async findStudentById(id: string) {
    return this.userRepo.findOne({
      where: { id, role: UserRole.STUDENT },
      relations: { platformAccounts: true, timelineEvents: true, solvedProblems: { problem: true } },
    });
  }

  async updateStudent(id: string, data: Partial<User>, platformData?: Partial<PlatformAccounts>) {
    const student = await this.findStudentById(id);
    if (!student) return null;

    if (data) {
      Object.assign(student, data);
    }
    
    if (platformData && student.platformAccounts) {
      Object.assign(student.platformAccounts, platformData);
      await this.platformRepo.save(student.platformAccounts);
    }

    return this.userRepo.save(student);
  }

  async getLeaderboard() {
    const students = await this.userRepo.find({
      where: { role: UserRole.STUDENT },
      relations: { platformAccounts: true },
      order: { score: "DESC" },
    });
    
    return students.map((student, index) => ({
      ...student,
      rank: index + 1
    }));
  }

  async createTimelineEvent(userId: string, title: string, iconName: string, color: string) {
    const event = this.timelineRepo.create({ userId, title, iconName, color });
    return this.timelineRepo.save(event);
  }

  async incrementScore(userId: string, points: number) {
    const user = await this.userRepo.findOne({ where: { id: userId } });
    if (user) {
      user.score += points;
      await this.userRepo.save(user);
    }
  }
}
