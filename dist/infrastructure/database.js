"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const User_1 = require("../adapters/models/User");
const PlatformAccounts_1 = require("../adapters/models/PlatformAccounts");
const Problem_1 = require("../adapters/models/Problem");
const SolvedProblem_1 = require("../adapters/models/SolvedProblem");
const Contest_1 = require("../adapters/models/Contest");
const TimelineEvent_1 = require("../adapters/models/TimelineEvent");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    url: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres",
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    extra: {
        ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    },
    synchronize: true, // Auto-sync for dev environment
    logging: false,
    entities: [User_1.User, PlatformAccounts_1.PlatformAccounts, Problem_1.Problem, SolvedProblem_1.SolvedProblem, Contest_1.Contest, TimelineEvent_1.TimelineEvent],
    subscribers: [],
    migrations: [],
});
const connectDB = async () => {
    try {
        if (!exports.AppDataSource.isInitialized) {
            await exports.AppDataSource.initialize();
            console.log("PostgreSQL Database connected successfully via TypeORM");
        }
    }
    catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
};
exports.connectDB = connectDB;
