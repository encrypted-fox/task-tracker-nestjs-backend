import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentTypesEntity } from './commentTypes.entity';
import { CommentTypesService } from './commentTypes.service';
import { CommentTypesController } from './commentTypes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommentTypesEntity])],
  providers: [CommentTypesService],
  exports: [CommentTypesService],
  controllers: [CommentTypesController],
})
export class CommentTypesModule {}
