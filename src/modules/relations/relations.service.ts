import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { RelationsEntity } from './relations.entity';

@Injectable()
export class RelationsService extends BaseService<RelationsEntity> {
  constructor(
    @InjectRepository(RelationsEntity)
    private relationsRepository: Repository<RelationsEntity>,
  ) {
    const relations = {
      task: true,
      relatedTasks: true,
      relationType: true,
      creator: true,
    };
    const searchFields = ['id'];

    super(relationsRepository, searchFields, relations);
  }
}
