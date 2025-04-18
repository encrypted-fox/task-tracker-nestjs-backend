import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisibilityEntity } from './visibilities.entity';
import { VisibilitiesService } from './visibilities.service';
import { VisibilitiesController } from './visibilities.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VisibilityEntity])],
  providers: [VisibilitiesService],
  exports: [VisibilitiesService],
  controllers: [VisibilitiesController],
})
export class VisibilitiesModule {}
