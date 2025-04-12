import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardDTO } from './boards.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { ProjectsModule } from 'src/modules/projects/projects.module';

@Module({
  imports: [TypeOrmModule.forFeature([BoardDTO]), UsersModule, ProjectsModule],
  providers: [BoardsService],
  exports: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
