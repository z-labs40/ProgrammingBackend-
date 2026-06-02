import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";
import { User } from "./User";
import { Problem } from "./Problem";

@Entity()
export class SolvedProblem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  userId: string;

  @Column("uuid")
  problemId: string;

  @CreateDateColumn()
  solvedAt: Date;

  @ManyToOne(() => User, user => user.solvedProblems)
  @JoinColumn({ name: "userId" })
  user: User;

  @ManyToOne(() => Problem, problem => problem.solvedBy)
  @JoinColumn({ name: "problemId" })
  problem: Problem;
}
