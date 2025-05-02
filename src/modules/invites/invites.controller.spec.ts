import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.service';
import { InvitesEntity } from './invites.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('InvitesController', () => {
  createControllerSpec<InvitesController>({
    controller: InvitesController,
    service: InvitesService,
    entity: InvitesEntity,
    entityName: 'invites',
  });
});
