import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "../users/user.entity";

export enum TaskStatus {
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  COMPLETED = "completed"
}

export enum TaskPriority {
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high"
}

@Entity("tasks")
export class Task {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 120 })
  title!: string;

  @Column({ type: "text", nullable: true })
  description!: string | null;

  @Column({ type: "text", default: TaskStatus.TODO })
  status!: TaskStatus;

  @Column({ type: "text", default: TaskPriority.MEDIUM })
  priority!: TaskPriority;

  @Column({ type: "datetime", nullable: true })
  dueDate!: Date | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @ManyToOne(() => User, (user) => user.tasks, { onDelete: "CASCADE" })
  user!: User;
}
