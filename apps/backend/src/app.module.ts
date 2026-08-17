import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { Task } from "./tasks/task.entity";
import { TasksModule } from "./tasks/tasks.module";
import { User } from "./users/user.entity";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "sqlite",
      database: process.env.DATABASE_PATH ?? "database.sqlite",
      entities: [User, Task],
      synchronize: true
    }),
    AuthModule,
    TasksModule
  ]
})
export class AppModule {}
