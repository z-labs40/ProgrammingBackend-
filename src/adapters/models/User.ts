import { Entity, PrimaryGeneratedColumn, Column, OneToOne, OneToMany } from "typeorm";
import { PlatformAccounts } from "./PlatformAccounts";
import { SolvedProblem } from "./SolvedProblem";
import { TimelineEvent } from "./TimelineEvent";

export enum UserRole {
  ADMIN = "ADMIN",
  STUDENT = "STUDENT"
}

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.STUDENT })
  role: UserRole;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true, nullable: true })
  rollNumber: string;

  @Column({ nullable: true })
  department: string;

  @Column({ default: "University" })
  college: string;

  @Column({ type: "text", nullable: true })
  bio: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ default: 0 })
  score: number;

  @Column({ default: 1200 })
  rating: number;

  @Column({ nullable: true })
  rank: number;

  @Column({ default: "Active" })
  status: string;

  @OneToOne(() => PlatformAccounts, accounts => accounts.user, { cascade: true })
  platformAccounts: PlatformAccounts;

  @OneToMany(() => SolvedProblem, solved => solved.user, { cascade: true })
  solvedProblems: SolvedProblem[];

  @OneToMany(() => TimelineEvent, event => event.user, { cascade: true })
  timelineEvents: TimelineEvent[];
}
