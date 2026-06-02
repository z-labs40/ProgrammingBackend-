var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { PlatformAccounts } from "./PlatformAccounts";
import { SolvedProblem } from "./SolvedProblem";
import { TimelineEvent } from "./TimelineEvent";
export var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "ADMIN";
    UserRole["STUDENT"] = "STUDENT";
})(UserRole || (UserRole = {}));
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
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], User.prototype, "id", void 0);
__decorate([
    Column({ type: "enum", enum: UserRole, default: UserRole.STUDENT }),
    __metadata("design:type", String)
], User.prototype, "role", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    Column({ unique: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    Column({ unique: true, nullable: true }),
    __metadata("design:type", String)
], User.prototype, "rollNumber", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "department", void 0);
__decorate([
    Column({ default: "University" }),
    __metadata("design:type", String)
], User.prototype, "college", void 0);
__decorate([
    Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], User.prototype, "bio", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], User.prototype, "avatarUrl", void 0);
__decorate([
    Column({ default: 0 }),
    __metadata("design:type", Number)
], User.prototype, "score", void 0);
__decorate([
    Column({ default: 1200 }),
    __metadata("design:type", Number)
], User.prototype, "rating", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", Number)
], User.prototype, "rank", void 0);
__decorate([
    Column({ default: "Active" }),
    __metadata("design:type", String)
], User.prototype, "status", void 0);
__decorate([
    OneToOne(() => PlatformAccounts, accounts => accounts.user, { cascade: true }),
    __metadata("design:type", PlatformAccounts)
], User.prototype, "platformAccounts", void 0);
__decorate([
    OneToMany(() => SolvedProblem, solved => solved.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "solvedProblems", void 0);
__decorate([
    OneToMany(() => TimelineEvent, event => event.user, { cascade: true }),
    __metadata("design:type", Array)
], User.prototype, "timelineEvents", void 0);
User = __decorate([
    Entity()
], User);
export { User };
