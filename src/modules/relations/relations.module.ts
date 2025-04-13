import { Module } from '@nestjs/common';
import { UsersModule } from 'src/modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RelationEntity } from './relations.entity';
import { RelationsService } from './relations.service';
import { RelationsController } from './relations.controller';
import { TasksModule } from '../tasks/tasks.module';
import { RelationTypesModule } from '../relationTypes/relationTypes.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([RelationEntity]),
    UsersModule,
    TasksModule,
    RelationTypesModule,
  ],
  providers: [RelationsService],
  exports: [RelationsService],
  controllers: [RelationsController],
})
export class RelationsModule {}
