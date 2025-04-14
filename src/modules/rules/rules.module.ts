import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RuleEntity } from './rules.entity';
import { RulesService } from './rules.service';
import { RulesController } from './rules.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RuleEntity])],
  providers: [RulesService],
  exports: [RulesService],
  controllers: [RulesController],
})
export class RulesModule {}
