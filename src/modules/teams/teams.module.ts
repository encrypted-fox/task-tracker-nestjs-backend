import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamEntity } from './teams.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [TypeOrmModule.forFeature([TeamEntity]), ConfigModule.forRoot()],
  providers: [TeamsService],
  exports: [TeamsService],
})
export class TeamsModule {}
