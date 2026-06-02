import { UserRepository } from "../../adapters/repositeries/UserRepository";
import { UserRole } from "../../adapters/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../../config";

export class AuthUseCase {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  private generateToken(id: string, role: string) {
    return jwt.sign({ id, role }, config.jwt.secret, {
      expiresIn: config.jwt.expiresIn as any,
    });
  }

  async studentSignup(data: any) {
    const { email, password, name } = data;
    if (!email || !password || !name) {
      throw new Error("Missing required fields");
    }

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newStudent = await this.userRepository.createStudent({
      email,
      name,
      password: hashedPassword,
    });

    const token = this.generateToken(newStudent.id, newStudent.role);
    
    // Omit password from response
    const { password: _, ...studentData } = newStudent;
    
    return {
      token,
      user: studentData,
    };
  }

  async studentLogin(data: any) {
    const { email, password } = data;
    if (!email || !password) {
      throw new Error("Missing required fields");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user || user.role !== UserRole.STUDENT || !user.password) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = this.generateToken(user.id, user.role);
    
    const { password: _, ...studentData } = user;
    
    return {
      token,
      user: studentData,
    };
  }

  async adminLogin(data: any) {
    const { email, password } = data;
    if (!email || !password) {
      throw new Error("Missing required fields");
    }

    const user = await this.userRepository.findByEmail(email);
    if (!user || user.role !== UserRole.ADMIN || !user.password) {
      throw new Error("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Invalid email or password");
    }

    const token = this.generateToken(user.id, user.role);
    
    const { password: _, ...adminData } = user;
    
    return {
      token,
      user: adminData,
    };
  }
}
