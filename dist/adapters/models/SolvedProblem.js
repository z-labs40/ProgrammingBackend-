"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SolvedProblem = void 0;
const typeorm_1 = require("typeorm");
const User_1 = require("./User");
const Problem_1 = require("./Problem");
let SolvedProblem = class SolvedProblem {
    id;
    userId;
    problemId;
    solvedAt;
    user;
    problem;
};
exports.SolvedProblem = SolvedProblem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], SolvedProblem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], SolvedProblem.prototype, "userId", void 0);
__decorate([
    (0, typeorm_1.Column)("uuid"),
    __metadata("design:type", String)
], SolvedProblem.prototype, "problemId", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SolvedProblem.prototype, "solvedAt", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => User_1.User, user => user.solvedProblems),
    (0, typeorm_1.JoinColumn)({ name: "userId" }),
    __metadata("design:type", User_1.User)
], SolvedProblem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Problem_1.Problem, problem => problem.solvedBy),
    (0, typeorm_1.JoinColumn)({ name: "problemId" }),
    __metadata("design:type", Problem_1.Problem)
], SolvedProblem.prototype, "problem", void 0);
exports.SolvedProblem = SolvedProblem = __decorate([
    (0, typeorm_1.Entity)()
], SolvedProblem);
