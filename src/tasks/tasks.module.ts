import { Module } from '@nestjs/common';
import { TasksController } from './tasks.controller';

@Module({
  imports: [],
  providers: [],
  controllers: [TasksController],
})
export class TasksModule {}