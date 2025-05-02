import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../helpers/base/BaseService';
import { PermissionsEntity } from './permissions.entity';

@Injectable()
export class PermissionsService extends BaseService<PermissionsEntity> {
  constructor(
    @InjectRepository(PermissionsEntity)
    private permissionsRepository: Repository<PermissionsEntity>,
  ) {
    const relations = { role: true };
    const searchFields = ['id', 'title', 'value'];

    super(permissionsRepository, searchFields, relations);
  }
}
