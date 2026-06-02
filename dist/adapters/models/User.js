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
exports.User = exports.UserRole = void 0;
const typeorm_1 = require("typeorm");
const PlatformAccounts_1 = require("./PlatformAccounts");
const SolvedProblem_1 = require("./SolvedProblem");
const TimelineEvent_1 = require("./TimelineEvent");
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["STUDENT"] = "STUDENT";
})(UserRole || (exports.UserRole = UserRole = {}));
let User = class User {
    id;
    role;
    name;
    email;
    rollNumber;
    department;
    college;
    bio;
    avatarUrl;
    score;
    rating;
    rank;
    status;
    platformAccounts;
    solvedProblems;
    timelineEvents;
};
exports.User = User;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: UserRole, default: UserRole.STUDENT }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "rollNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "department", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "University" }),
    __metadata("design:type", String)
], User.prototype, "college", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "text", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "score", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 1200 }),
    __metadata("design:type", Number)
], User.prototype, "rating", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "rank", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: "Active" }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => PlatformAccounts_1.PlatformAccounts, accounts => accounts.user, { cascade: true }),
    __metadata("design:type", PlatformAccounts_1.PlatformAccounts)
], User.prototype, "platformAccounts", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => SolvedProblem_1.SolvedProblem, solved => solved.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "solvedProblems", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => TimelineEvent_1.TimelineEvent, event => event.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "timelineEvents", void 0);
exports.User = User = __decorate([
    (0, typeorm_1.Entity)()
], User);
