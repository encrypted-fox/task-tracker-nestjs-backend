import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './boards.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { ProjectsModule } from 'src/projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), UsersModule, ProjectsModule],
  providers: [BoardsService],
  exports: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}