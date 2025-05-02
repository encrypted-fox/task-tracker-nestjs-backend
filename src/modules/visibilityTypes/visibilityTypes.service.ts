import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../helpers/base/BaseService';
import { VisibilityTypesEntity } from './visibilityTypes.entity';

@Injectable()
export class VisibilityTypesService extends BaseService<VisibilityTypesEntity> {
  constructor(
    @InjectRepository(VisibilityTypesEntity)
    private visibilityTypesRepository: Repository<VisibilityTypesEntity>,
  ) {
    const relations = {};
    const searchFields = ['id', 'title'];

    super(visibilityTypesRepository, searchFields, relations);
  }
}
