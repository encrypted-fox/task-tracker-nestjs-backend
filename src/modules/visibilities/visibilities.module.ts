import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisibilitiesEntity } from './visibilities.entity';
import { VisibilitiesService } from './visibilities.service';
import { VisibilitiesController } from './visibilities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VisibilitiesEntity])],
  providers: [VisibilitiesService],
  exports: [VisibilitiesService],
  controllers: [VisibilitiesController],
})
export class VisibilitiesModule {}
