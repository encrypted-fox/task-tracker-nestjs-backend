import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './teams.entity';
import { TeamsController } from './teams.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity])],
  providers: [TeamsService],
  exports: [TeamsService],
  controllers: [TeamsController],
})
export class TeamsModule {}
