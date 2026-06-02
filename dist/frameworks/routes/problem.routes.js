"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ProblemController_1 = require("../../adapters/controllers/ProblemController");
const router = (0, express_1.Router)();
const problemController = new ProblemController_1.ProblemController();
router.get("/", problemController.getAllProblems);
router.post("/solve", problemController.solveProblem);
exports.default = router;
