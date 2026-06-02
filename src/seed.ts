import "reflect-metadata";
import { AppDataSource } from "./infrastructure/database";
import { User, UserRole } from "./adapters/models/User";
import { PlatformAccounts } from "./adapters/models/PlatformAccounts";
import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();

const seedAdmin = async () => {
  try {
    console.log("Initializing database connection...");
    await AppDataSource.initialize();

    const userRepository = AppDataSource.getRepository(User);
    
    const existingAdmin = await userRepository.findOne({ where: { role: UserRole.ADMIN } });
    if (existingAdmin) {
      console.log("Admin user already exists. Seed complete.");
      process.exit(0);
    }

    console.log("Creating default admin user...");
    const hashedPassword = await bcrypt.hash("Admin@123", 10);
    
    const platformAccounts = new PlatformAccounts();
    const admin = userRepository.create({
      name: "Super Admin",
      email: "admin@example.com",
      password: hashedPassword,
      role: UserRole.ADMIN,
      platformAccounts,
    });

    await userRepository.save(admin);
    console.log("Default admin created successfully!");
    console.log("Email: admin@example.com");
    console.log("Password: Admin@123");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding admin:", error);
    process.exit(1);
  }
};

seedAdmin();
