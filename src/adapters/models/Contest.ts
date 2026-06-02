import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

export enum ContestType {
  UPCOMING = "UPCOMING",
  RECENT = "RECENT"
}

@Entity()
export class Contest {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  platform: string;

  @Column()
  date: Date;

  @Column({ type: "enum", enum: ContestType })
  type: ContestType;

  @Column({ default: 0 })
  registeredCount: number;

  @Column()
  link: string;
}
