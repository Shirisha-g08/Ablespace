import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { Task } from "./task.entity";
import { User } from "../users/user.entity";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly tasksRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>
  ) {}

  findAll(userId: number) {
    return this.tasksRepository.find({
      where: { user: { id: userId } },
      order: { createdAt: "DESC" }
    });
  }

  async create(userId: number, dto: CreateTaskDto) {
    const user = await this.usersRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const task = this.tasksRepository.create({
      ...dto,
      description: dto.description ?? null,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      user
    });

    return this.tasksRepository.save(task);
  }

  async update(userId: number, taskId: number, dto: UpdateTaskDto) {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } },
      relations: ["user"]
    });

    if (!task) {
      throw new NotFoundException("Task not found");
    }

    task.title = dto.title ?? task.title;
    task.description = dto.description ?? task.description;
    task.status = dto.status ?? task.status;
    task.priority = dto.priority ?? task.priority;
    task.dueDate = dto.dueDate ? new Date(dto.dueDate) : dto.dueDate === undefined ? task.dueDate : null;

    return this.tasksRepository.save(task);
  }

  async remove(userId: number, taskId: number) {
    const task = await this.tasksRepository.findOne({
      where: { id: taskId, user: { id: userId } }
    });

    if (!task) {
      throw new NotFoundException("Task not found");
    }

    await this.tasksRepository.remove(task);
    return { success: true };
  }
}
