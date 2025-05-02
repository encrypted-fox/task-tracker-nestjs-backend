import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { InvitesEntity } from './invites.entity';

describe('InvitesEntity', () => {
  createEntityTests({
    entity: InvitesEntity,
    entityName: 'invites',
    columns: ['id', 'value', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [
      {
        name: 'team',
        relationType: 'many-to-one',
      },
      {
        name: 'creator',
        relationType: 'many-to-one',
      },
    ],
  });
});
