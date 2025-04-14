import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardEntity } from './boards.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BoardEntity])],
  providers: [BoardsService],
  exports: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
