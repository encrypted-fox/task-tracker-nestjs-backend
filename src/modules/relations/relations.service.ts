import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { RelationEntity } from './relations.entity';

@Injectable()
export class RelationsService extends BaseService<RelationEntity> {
  constructor(
    @InjectRepository(RelationEntity)
    private relationsRepository: Repository<RelationEntity>,
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
