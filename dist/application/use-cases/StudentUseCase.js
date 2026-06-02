import { UserRepository } from "../../adapters/repositeries/UserRepository";
export class StudentUseCase {
    userRepository;
    constructor() {
        this.userRepository = new UserRepository();
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
