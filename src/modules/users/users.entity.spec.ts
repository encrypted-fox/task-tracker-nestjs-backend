import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { UsersEntity } from './users.entity';

describe('UsersEntity', () => {
  createEntityTests({
    entity: UsersEntity,
    entityName: 'users',
    columns: [
      'id',
      'username',
      'password',
      'email',
      'phone',
      'firstName',
      'middleName',
      'lastName',
      'avatar',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    relations: [
      {
        name: 'teams',
        relationType: 'many-to-many',
      },
      {
        name: 'role',
        relationType: 'many-to-one',
      },
    ],
  });
});
