import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../adapters/models/User";
import { PlatformAccounts } from "../adapters/models/PlatformAccounts";
import { Problem } from "../adapters/models/Problem";
import { SolvedProblem } from "../adapters/models/SolvedProblem";
import { Contest } from "../adapters/models/Contest";
import { TimelineEvent } from "../adapters/models/TimelineEvent";
import * as dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres",
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  extra: {
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
  },
  synchronize: true, // Auto-sync for dev environment
  logging: false,
  entities: [User, PlatformAccounts, Problem, SolvedProblem, Contest, TimelineEvent],
  subscribers: [],
  migrations: [],
});

export const connectDB = async () => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
      console.log("PostgreSQL Database connected successfully via TypeORM");
    }
  } catch (error) {
    console.error("Database connection failed", error);
    process.exit(1);
  }
};
