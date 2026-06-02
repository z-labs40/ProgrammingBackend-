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
let TimelineEvent = class TimelineEvent {
    id;
    userId;
    title;
    iconName;
    color;
    createdAt;
    user;
};
__decorate([
    PrimaryGeneratedColumn("uuid"),
    __metadata("design:type", String)
], TimelineEvent.prototype, "id", void 0);
__decorate([
    Column("uuid"),
    __metadata("design:type", String)
], TimelineEvent.prototype, "userId", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], TimelineEvent.prototype, "title", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], TimelineEvent.prototype, "iconName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], TimelineEvent.prototype, "color", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], TimelineEvent.prototype, "createdAt", void 0);
__decorate([
    ManyToOne(() => User, user => user.timelineEvents),
    JoinColumn({ name: "userId" }),
    __metadata("design:type", User)
], TimelineEvent.prototype, "user", void 0);
TimelineEvent = __decorate([
    Entity()
], TimelineEvent);
export { TimelineEvent };
