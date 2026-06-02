"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ContestController_1 = require("../../adapters/controllers/ContestController");
const router = (0, express_1.Router)();
const contestController = new ContestController_1.ContestController();
router.get("/", contestController.getAllContests);
exports.default = router;
