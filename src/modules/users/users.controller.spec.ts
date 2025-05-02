import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('UsersController', () => {
  createControllerSpec<UsersController>({
    controller: UsersController,
    service: UsersService,
    entity: UsersEntity,
    entityName: 'users',
  });
});
