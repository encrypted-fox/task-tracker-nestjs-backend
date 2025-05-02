import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesEntity } from './roles.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('RolesController', () => {
  createControllerSpec<RolesController>({
    controller: RolesController,
    service: RolesService,
    entity: RolesEntity,
    entityName: 'roles',
  });
});
