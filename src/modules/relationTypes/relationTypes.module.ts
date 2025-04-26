import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationTypesEntity } from './relationTypes.entity';
import { RelationTypesService } from './relationTypes.service';
import { RelationTypesController } from './relationTypes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RelationTypesEntity])],
  providers: [RelationTypesService],
  exports: [RelationTypesService],
  controllers: [RelationTypesController],
})
export class RelationTypesModule {}
