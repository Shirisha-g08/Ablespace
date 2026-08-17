import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Task } from "../tasks/task.entity";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ length: 40 })
  displayName!: string;

  @Column({ default: true })
  isGuest!: boolean;

  @CreateDateColumn()
  createdAt!: Date;

  @OneToMany(() => Task, (task) => task.user)
  tasks!: Task[];
}
