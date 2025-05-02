import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PermissionsEntity } from './permissions.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('PermissionsController', () => {
  createControllerSpec<PermissionsController>({
    controller: PermissionsController,
    service: PermissionsService,
    entity: PermissionsEntity,
    entityName: 'permissions',
  });
});
