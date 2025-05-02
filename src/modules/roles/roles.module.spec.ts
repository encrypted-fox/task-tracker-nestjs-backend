import { RolesModule } from './roles.module';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesEntity } from './roles.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('RolesModule', () => {
  createModuleSpec<RolesController, RolesService>({
    module: RolesModule,
    controller: RolesController,
    service: RolesService,
    entity: RolesEntity,
  });
});
