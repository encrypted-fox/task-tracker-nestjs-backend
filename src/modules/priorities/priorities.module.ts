import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PriorityEntity } from './priorities.entity';
import { PrioritiesService } from './priorities.service';
import { PrioritiesController } from './priorities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PriorityEntity])],
  providers: [PrioritiesService],
  exports: [PrioritiesService],
  controllers: [PrioritiesController],
})
export class BoardsModule {}
