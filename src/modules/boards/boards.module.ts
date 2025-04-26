import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardsEntity } from './boards.entity';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([BoardsEntity])],
  providers: [BoardsService],
  exports: [BoardsService],
  controllers: [BoardsController],
})
export class BoardsModule {}
