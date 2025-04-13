import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { ProjectsModule } from 'src/modules/projects/projects.module';
import { BoardsModule } from 'src/modules/boards/boards.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskEntity } from './tasks.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { ColumnsModule } from '../columns/columns.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEntity]),
    UsersModule,
    ProjectsModule,
    BoardsModule,
    ColumnsModule,
    ConfigModule.forRoot(),
  ],
  providers: [TasksService],
  exports: [TasksService],
  controllers: [TasksController],
})
export class TasksModule {}
