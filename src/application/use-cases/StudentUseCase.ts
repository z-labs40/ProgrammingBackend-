import { UserRepository } from "../../adapters/repositeries/UserRepository";

export class StudentUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async getAllStudents() {
    return this.userRepository.findAllStudents();
  }

  async getStudentProfile(id: string) {
    return this.userRepository.findStudentById(id);
  }

  async createStudent(data: any) {
    return this.userRepository.createStudent(data);
  }

  async updateStudentProfile(id: string, data: any) {
    const { leetcode, codeforces, hackerrank, ...profileData } = data;
    const platformData = { leetcode, codeforces, hackerrank };
    return this.userRepository.updateStudent(id, profileData, platformData);
  }

  async getLeaderboard() {
    return this.userRepository.getLeaderboard();
  }
}
