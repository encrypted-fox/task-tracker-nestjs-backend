import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentTypeEntity } from './commentTypes.entity';
import { CommentTypesService } from './commentTypes.service';
import { CommentTypesController } from './commentTypes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([CommentTypeEntity])],
  providers: [CommentTypesService],
  exports: [CommentTypesService],
  controllers: [CommentTypesController],
})
export class CommentTypesModule {}
