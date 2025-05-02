import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';

describe('UsersService', () => {
  createServiceSpec<UsersService, UsersEntity>({
    service: UsersService,
    entity: UsersEntity,
    relations: { teams: true, role: true },
    searchFields: [
      'id',
      'username',
      'email',
      'phone',
      'firstName',
      'middleName',
      'lastName',
    ],
  });
});
