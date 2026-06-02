import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class PlatformAccounts {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ nullable: true })
  leetcode: string;

  @Column({ nullable: true })
  codeforces: string;

  @Column({ nullable: true })
  hackerrank: string;

  @OneToOne(() => User, user => user.platformAccounts)
  @JoinColumn({ name: "userId" })
  user: User;

  @Column("uuid")
  userId: string;
}
