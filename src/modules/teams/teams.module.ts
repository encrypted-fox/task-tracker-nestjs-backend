import { Module } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamsEntity } from './teams.entity';
import { TeamsController } from './teams.controller';

@Module({
  imports: [TypeOrmModule.forFeature([TeamsEntity])],
  providers: [TeamsService],
  exports: [TeamsService],
  controllers: [TeamsController],
})
export class TeamsModule {}
