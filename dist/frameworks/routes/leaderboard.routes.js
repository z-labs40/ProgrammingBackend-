"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const LeaderboardController_1 = require("../../adapters/controllers/LeaderboardController");
const router = (0, express_1.Router)();
const leaderboardController = new LeaderboardController_1.LeaderboardController();
router.get("/", leaderboardController.getLeaderboard);
exports.default = router;
