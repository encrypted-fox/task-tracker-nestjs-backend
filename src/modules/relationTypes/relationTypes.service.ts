import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { RelationTypeEntity } from './relationTypes.entity';

@Injectable()
export class RelationTypesService extends BaseService {
  constructor(
    @InjectRepository(RelationTypeEntity)
    private relationTypesRepository: Repository<RelationTypeEntity>,
  ) {
    const relations = {};
    const searchFields = ['id', 'title'];

    super(relationTypesRepository, searchFields, relations);
  }
}
