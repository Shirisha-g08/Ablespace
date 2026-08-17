import { Type } from "class-transformer";
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength
} from "class-validator";
import { TaskPriority, TaskStatus } from "../task.entity";

export class CreateTaskDto {
  @IsString()
  @MinLength(1)
  @MaxLength(120)
  title!: string;

  @IsOptional()
  @IsString()
  @MaxLength(1000)
  description?: string;

  @Type(() => String)
  @IsEnum(TaskStatus)
  status!: TaskStatus;

  @Type(() => String)
  @IsEnum(TaskPriority)
  priority!: TaskPriority;

  @IsOptional()
  @IsDateString()
  dueDate?: string;
}
