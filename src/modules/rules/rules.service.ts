import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { RuleEntity } from './rules.entity';

@Injectable()
export class RulesService extends BaseService<RuleEntity> {
  constructor(
    @InjectRepository(RuleEntity)
    private rulesRepository: Repository<RuleEntity>,
  ) {
    const relations = { role: true };
    const searchFields = ['id', 'title', 'value'];

    super(rulesRepository, searchFields, relations);
  }
}
