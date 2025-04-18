import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { VisibilityTypeEntity } from './visibilityTypes.entity';

@Injectable()
export class VisibilityTypesService extends BaseService<VisibilityTypeEntity> {
  constructor(
    @InjectRepository(VisibilityTypeEntity)
    private visibilityTypesRepository: Repository<VisibilityTypeEntity>,
  ) {
    const relations = {};
    const searchFields = ['id', 'title'];

    super(visibilityTypesRepository, searchFields, relations);
  }
}
