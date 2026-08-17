import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards
} from "@nestjs/common";
import { GetCurrentUser } from "../auth/current-user.decorator";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../auth/jwt-payload.interface";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskDto } from "./dto/update-task.dto";
import { TasksService } from "./tasks.service";

@Controller("tasks")
@UseGuards(JwtAuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  findAll(@GetCurrentUser() user: CurrentUser) {
    return this.tasksService.findAll(user.userId);
  }

  @Post()
  create(@GetCurrentUser() user: CurrentUser, @Body() dto: CreateTaskDto) {
    return this.tasksService.create(user.userId, dto);
  }

  @Patch(":id")
  update(
    @GetCurrentUser() user: CurrentUser,
    @Param("id", ParseIntPipe) id: number,
    @Body() dto: UpdateTaskDto
  ) {
    return this.tasksService.update(user.userId, id, dto);
  }

  @Delete(":id")
  remove(@GetCurrentUser() user: CurrentUser, @Param("id", ParseIntPipe) id: number) {
    return this.tasksService.remove(user.userId, id);
  }
}
