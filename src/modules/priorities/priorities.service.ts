import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { PrioritiesEntity } from './priorities.entity';

@Injectable()
export class PrioritiesService extends BaseService<PrioritiesEntity> {
  constructor(
    @InjectRepository(PrioritiesEntity)
    private prioritiesRepository: Repository<PrioritiesEntity>,
  ) {
    const relations = {};
    const searchFields = ['id', 'title', 'value'];

    super(prioritiesRepository, searchFields, relations);
  }
}
