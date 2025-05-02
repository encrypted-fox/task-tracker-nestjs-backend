import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { RolesEntity } from './roles.entity';

@Injectable()
export class RolesService extends BaseService<RolesEntity> {
  constructor(
    @InjectRepository(RolesEntity)
    private rolesRepository: Repository<RolesEntity>,
  ) {
    const relations = { team: true };
    const searchFields = ['id', 'title'];

    super(rolesRepository, searchFields, relations);
  }
}
