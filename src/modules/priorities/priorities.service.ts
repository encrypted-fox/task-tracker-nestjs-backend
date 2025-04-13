import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { PriorityEntity } from './priorities.entity';

@Injectable()
export class PrioritiesService extends BaseService {
  constructor(
    @InjectRepository(PriorityEntity)
    private prioritiesRepository: Repository<PriorityEntity>,
  ) {
    super(prioritiesRepository);
  }
}
