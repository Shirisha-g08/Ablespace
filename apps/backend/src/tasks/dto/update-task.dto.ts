import { Type } from "class-transformer";
import { IsDateString, IsEnum, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { TaskPriority, TaskStatus } from "../task.entity";

export class UpdateTaskDto {
	@IsOptional()
	@IsString()
	@MinLength(1)
	@MaxLength(120)
	title?: string;

	@IsOptional()
	@IsString()
	@MaxLength(1000)
	description?: string;

	@IsOptional()
	@Type(() => String)
	@IsEnum(TaskStatus)
	status?: TaskStatus;

	@IsOptional()
	@Type(() => String)
	@IsEnum(TaskPriority)
	priority?: TaskPriority;

	@IsOptional()
	@IsDateString()
	dueDate?: string;
}
