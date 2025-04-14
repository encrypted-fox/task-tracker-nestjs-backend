import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationEntity } from './relations.entity';
import { RelationsService } from './relations.service';
import { RelationsController } from './relations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RelationEntity])],
  providers: [RelationsService],
  exports: [RelationsService],
  controllers: [RelationsController],
})
export class RelationsModule {}
