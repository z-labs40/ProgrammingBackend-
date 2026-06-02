var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";
let PlatformAccounts = class PlatformAccounts {
    id;
    leetcode;
    codeforces;
    hackerrank;
    user;
    userId;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], PlatformAccounts.prototype, "id", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], PlatformAccounts.prototype, "leetcode", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], PlatformAccounts.prototype, "codeforces", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], PlatformAccounts.prototype, "hackerrank", void 0);
__decorate([
    OneToOne(() => User, user => user.platformAccounts),
    JoinColumn({ name: "userId" }),
    __metadata("design:type", User)
], PlatformAccounts.prototype, "user", void 0);
__decorate([
    Column("uuid"),
    __metadata("design:type", String)
], PlatformAccounts.prototype, "userId", void 0);
PlatformAccounts = __decorate([
    Entity()
], PlatformAccounts);
export { PlatformAccounts };
