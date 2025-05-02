import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { InvitesService } from './invites.service';
import { InvitesEntity } from './invites.entity';

describe('InvitesService', () => {
  createServiceSpec<InvitesService, InvitesEntity>({
    service: InvitesService,
    entity: InvitesEntity,
    relations: { creator: true, team: true },
    searchFields: ['value'],
  });
});
