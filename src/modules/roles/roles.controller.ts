import { Controller } from '@nestjs/common';
import { RolesEntity } from './roles.entity';
import { RolesService } from './roles.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/roles')
export class RolesController extends BaseController<RolesEntity, RolesService> {
  constructor(private rolesService: RolesService) {
    const rolesFields = ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'];
    super(rolesFields, rolesService);
  }
}
