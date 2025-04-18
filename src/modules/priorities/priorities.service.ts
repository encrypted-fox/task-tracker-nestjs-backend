import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { PriorityEntity } from './priorities.entity';

@Injectable()
export class PrioritiesService extends BaseService<PriorityEntity> {
  constructor(
    @InjectRepository(PriorityEntity)
    private prioritiesRepository: Repository<PriorityEntity>,
  ) {
    const relations = {};
    const searchFields = ['id', 'title', 'value'];

    super(prioritiesRepository, searchFields, relations);
  }
}
