import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { RolesEntity } from './roles.entity';

describe('RelationsEntity', () => {
  createEntityTests({
    entity: RolesEntity,
    entityName: 'roles',
    columns: ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [
      {
        name: 'team',
        relationType: 'many-to-one',
      },
    ],
  });
});
