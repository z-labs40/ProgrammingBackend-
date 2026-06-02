"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentUseCase = void 0;
const UserRepository_1 = require("../../adapters/repositeries/UserRepository");
class StudentUseCase {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository_1.UserRepository();
    }
    async getAllStudents() {
        return this.userRepository.findAllStudents();
    }
    async getStudentProfile(id) {
        return this.userRepository.findStudentById(id);
    }
    async createStudent(data) {
        return this.userRepository.createStudent(data);
    }
    async updateStudentProfile(id, data) {
        const { leetcode, codeforces, hackerrank, ...profileData } = data;
        const platformData = { leetcode, codeforces, hackerrank };
        return this.userRepository.updateStudent(id, profileData, platformData);
    }
    async getLeaderboard() {
        return this.userRepository.getLeaderboard();
    }
}
exports.StudentUseCase = StudentUseCase;
