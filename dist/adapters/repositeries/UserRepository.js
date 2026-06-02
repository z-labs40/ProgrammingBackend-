"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const database_1 = require("../../infrastructure/database");
const User_1 = require("../models/User");
const PlatformAccounts_1 = require("../models/PlatformAccounts");
const TimelineEvent_1 = require("../models/TimelineEvent");
class UserRepository {
    userRepo = database_1.AppDataSource.getRepository(User_1.User);
    platformRepo = database_1.AppDataSource.getRepository(PlatformAccounts_1.PlatformAccounts);
    timelineRepo = database_1.AppDataSource.getRepository(TimelineEvent_1.TimelineEvent);
    async findAllStudents() {
        return this.userRepo.find({
            where: { role: User_1.UserRole.STUDENT },
            relations: { platformAccounts: true },
        });
    }
    async createStudent(data) {
        const platformAccounts = new PlatformAccounts_1.PlatformAccounts();
        const newStudent = this.userRepo.create({
            ...data,
            role: User_1.UserRole.STUDENT,
            platformAccounts,
        });
        return this.userRepo.save(newStudent);
    }
    async findStudentById(id) {
        return this.userRepo.findOne({
            where: { id, role: User_1.UserRole.STUDENT },
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
            where: { role: User_1.UserRole.STUDENT },
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
exports.UserRepository = UserRepository;
