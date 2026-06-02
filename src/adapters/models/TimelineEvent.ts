import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, JoinColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class TimelineEvent {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  userId: string;

  @Column()
  title: string;

  @Column()
  iconName: string;

  @Column()
  color: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.timelineEvents)
  @JoinColumn({ name: "userId" })
  user: User;
}
