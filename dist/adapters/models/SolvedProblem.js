var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";
import { User } from "./User";
import { Problem } from "./Problem";
let SolvedProblem = class SolvedProblem {
    id;
    userId;
    problemId;
    solvedAt;
    user;
    problem;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], SolvedProblem.prototype, "id", void 0);
__decorate([
    Column("uuid"),
    __metadata("design:type", String)
], SolvedProblem.prototype, "userId", void 0);
__decorate([
    Column("uuid"),
    __metadata("design:type", String)
], SolvedProblem.prototype, "problemId", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], SolvedProblem.prototype, "solvedAt", void 0);
__decorate([
    ManyToOne(() => User, user => user.solvedProblems),
    JoinColumn({ name: "userId" }),
    __metadata("design:type", User)
], SolvedProblem.prototype, "user", void 0);
__decorate([
    ManyToOne(() => Problem, problem => problem.solvedBy),
    JoinColumn({ name: "problemId" }),
    __metadata("design:type", Problem)
], SolvedProblem.prototype, "problem", void 0);
SolvedProblem = __decorate([
    Entity()
], SolvedProblem);
export { SolvedProblem };
