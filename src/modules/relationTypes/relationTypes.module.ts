import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationTypeEntity } from './relationTypes.entity';
import { RelationTypesService } from './relationTypes.service';
import { RelationTypesController } from './relationTypes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RelationTypeEntity])],
  providers: [RelationTypesService],
  exports: [RelationTypesService],
  controllers: [RelationTypesController],
})
export class RelationTypesModule {}
