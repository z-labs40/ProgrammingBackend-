import { AppDataSource } from "../../infrastructure/database";
import { User, UserRole } from "../models/User";
import { PlatformAccounts } from "../models/PlatformAccounts";
import { TimelineEvent } from "../models/TimelineEvent";
export class UserRepository {
    userRepo = AppDataSource.getRepository(User);
    platformRepo = AppDataSource.getRepository(PlatformAccounts);
    timelineRepo = AppDataSource.getRepository(TimelineEvent);
    async findAllStudents() {
        return this.userRepo.find({
            where: { role: UserRole.STUDENT },
            relations: { platformAccounts: true },
        });
    }
    async createStudent(data) {
        const platformAccounts = new PlatformAccounts();
        const newStudent = this.userRepo.create({
            ...data,
            role: UserRole.STUDENT,
            platformAccounts,
        });
        return this.userRepo.save(newStudent);
    }
    async findStudentById(id) {
        return this.userRepo.findOne({
            where: { id, role: UserRole.STUDENT },
            relations: { platformAccounts: true, timelineEvents: true, solvedProblems: { problem: true } },
        });
    }
    async updateStudent(id, data, platformData) {
        const student = await this.findStudentById(id);
        if (!student)
            return null;
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
    async createTimelineEvent(userId, title, iconName, color) {
        const event = this.timelineRepo.create({ userId, title, iconName, color });
        return this.timelineRepo.save(event);
    }
    async incrementScore(userId, points) {
        const user = await this.userRepo.findOne({ where: { id: userId } });
        if (user) {
            user.score += points;
            await this.userRepo.save(user);
        }
    }
}
