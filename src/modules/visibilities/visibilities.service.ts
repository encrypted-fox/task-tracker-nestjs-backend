import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { VisibilityEntity } from './visibilities.entity';

@Injectable()
export class VisibilitiesService extends BaseService {
  constructor(
    @InjectRepository(VisibilityEntity)
    private visibilitiesRepository: Repository<VisibilityEntity>,
  ) {
    const relations = {};
    const searchFields = ['id', 'title'];

    super(visibilitiesRepository, searchFields, relations);
  }
}
