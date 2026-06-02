import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SolvedProblem } from "./SolvedProblem";

export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD"
}

export enum Platform {
  LEETCODE = "LEETCODE",
  CODEFORCES = "CODEFORCES",
  HACKERRANK = "HACKERRANK"
}

@Entity()
export class Problem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column({ type: "enum", enum: Difficulty })
  difficulty: Difficulty;

  @Column({ type: "enum", enum: Platform })
  platform: Platform;

  @Column({ default: 0 })
  points: number;

  @Column()
  link: string;

  @OneToMany(() => SolvedProblem, solved => solved.problem)
  solvedBy: SolvedProblem[];
}
