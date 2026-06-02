"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const student_routes_1 = __importDefault(require("./student.routes"));
const problem_routes_1 = __importDefault(require("./problem.routes"));
const contest_routes_1 = __importDefault(require("./contest.routes"));
const leaderboard_routes_1 = __importDefault(require("./leaderboard.routes"));
const router = (0, express_1.Router)();
router.use("/students", student_routes_1.default);
router.use("/problems", problem_routes_1.default);
router.use("/contests", contest_routes_1.default);
router.use("/leaderboard", leaderboard_routes_1.default);
exports.default = router;
