import { InvitesModule } from './invites.module';
import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.service';
import { InvitesEntity } from './invites.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('InvitesModule', () => {
  createModuleSpec<InvitesController, InvitesService>({
    module: InvitesModule,
    controller: InvitesController,
    service: InvitesService,
    entity: InvitesEntity,
  });
});
