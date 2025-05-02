import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { PermissionsEntity } from './permissions.entity';

describe('PermissionsEntity', () => {
  createEntityTests({
    entity: PermissionsEntity,
    entityName: 'permissions',
    columns: ['id', 'title', 'value', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [
      {
        name: 'role',
        relationType: 'many-to-one',
      },
    ],
  });
});
