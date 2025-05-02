import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../helpers/base/BaseService';
import { RelationTypesEntity } from './relationTypes.entity';

@Injectable()
export class RelationTypesService extends BaseService<RelationTypesEntity> {
  constructor(
    @InjectRepository(RelationTypesEntity)
    private relationTypesRepository: Repository<RelationTypesEntity>,
  ) {
    const relations = {};
    const searchFields = ['id', 'title'];

    super(relationTypesRepository, searchFields, relations);
  }
}
