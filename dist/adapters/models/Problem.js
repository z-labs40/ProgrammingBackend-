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
exports.Problem = exports.Platform = exports.Difficulty = void 0;
const typeorm_1 = require("typeorm");
const SolvedProblem_1 = require("./SolvedProblem");
var Difficulty;
(function (Difficulty) {
    Difficulty["EASY"] = "EASY";
    Difficulty["MEDIUM"] = "MEDIUM";
    Difficulty["HARD"] = "HARD";
})(Difficulty || (exports.Difficulty = Difficulty = {}));
var Platform;
(function (Platform) {
    Platform["LEETCODE"] = "LEETCODE";
    Platform["CODEFORCES"] = "CODEFORCES";
    Platform["HACKERRANK"] = "HACKERRANK";
})(Platform || (exports.Platform = Platform = {}));
let Problem = class Problem {
    id;
    title;
    difficulty;
    platform;
    points;
    link;
    solvedBy;
};
exports.Problem = Problem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], Problem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Problem.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Difficulty }),
    __metadata("design:type", String)
], Problem.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Platform }),
    __metadata("design:type", String)
], Problem.prototype, "platform", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], Problem.prototype, "points", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Problem.prototype, "link", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SolvedProblem_1.SolvedProblem, solved => solved.problem),
    __metadata("design:type", Array)
], Problem.prototype, "solvedBy", void 0);
exports.Problem = Problem = __decorate([
    (0, typeorm_1.Entity)()
], Problem);
