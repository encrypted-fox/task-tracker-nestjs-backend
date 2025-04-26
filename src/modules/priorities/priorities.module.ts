import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PrioritiesEntity } from './priorities.entity';
import { PrioritiesService } from './priorities.service';
import { PrioritiesController } from './priorities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([PrioritiesEntity])],
  providers: [PrioritiesService],
  exports: [PrioritiesService],
  controllers: [PrioritiesController],
})
export class PrioritiesModule {}
