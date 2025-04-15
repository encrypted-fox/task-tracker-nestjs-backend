import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TagEntity } from './tags.entity';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TagEntity])],
  providers: [TagsService],
  exports: [TagsService],
  controllers: [TagsController],
})
export class TagsModule {}
