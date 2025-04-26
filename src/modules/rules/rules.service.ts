import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { RulesEntity } from './rules.entity';

@Injectable()
export class RulesService extends BaseService<RulesEntity> {
  constructor(
    @InjectRepository(RulesEntity)
    private rulesRepository: Repository<RulesEntity>,
  ) {
    const relations = { role: true };
    const searchFields = ['id', 'title', 'value'];

    super(rulesRepository, searchFields, relations);
  }
}
