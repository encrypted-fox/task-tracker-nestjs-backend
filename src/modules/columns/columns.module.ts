import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ColumnEntity } from './columns.entity';
import { ColumnsService } from './columns.service';
import { ColumnsController } from './columns.controller';
import { ProjectsModule } from '../projects/projects.module';
import { BoardsModule } from '../boards/boards.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ColumnEntity]),
    UsersModule,
    ProjectsModule,
    BoardsModule,
  ],
  providers: [ColumnsService],
  exports: [ColumnsService],
  controllers: [ColumnsController],
})
export class ColumnsModule {}
