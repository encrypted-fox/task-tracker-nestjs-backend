import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { VisibilitiesEntity } from './visibilities.entity';

@Injectable()
export class VisibilitiesService extends BaseService<VisibilitiesEntity> {
  constructor(
    @InjectRepository(VisibilitiesEntity)
    private visibilitiesRepository: Repository<VisibilitiesEntity>,
  ) {
    const relations = { visibilityType: true };
    const searchFields = ['id', 'title'];

    super(visibilitiesRepository, searchFields, relations);
  }
}
