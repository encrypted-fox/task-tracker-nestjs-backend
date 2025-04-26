import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VisibilityTypesEntity } from './visibilityTypes.entity';
import { VisibilityTypesService } from './visibilityTypes.service';
import { VisibilityTypesController } from './visibilityTypes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VisibilityTypesEntity])],
  providers: [VisibilityTypesService],
  exports: [VisibilityTypesService],
  controllers: [VisibilityTypesController],
})
export class VisibilityTypesModule {}
