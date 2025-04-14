import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { RoleEntity } from './roles.entity';

@Injectable()
export class RolesService extends BaseService {
  constructor(
    @InjectRepository(RoleEntity)
    private rolesRepository: Repository<RoleEntity>,
  ) {
    const relations = {};
    const searchFields = ['id', 'title'];

    super(rolesRepository, searchFields, relations);
  }
}
