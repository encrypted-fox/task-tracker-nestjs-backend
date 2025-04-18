import { Controller } from '@nestjs/common';
import { RoleEntity } from './roles.entity';
import { RolesService } from './roles.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/roles')
export class RolesController extends BaseController<RoleEntity, RolesService> {
  constructor(private rolesService: RolesService) {
    const rolesFields = ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'];
    super(rolesFields, rolesService);
  }
}
