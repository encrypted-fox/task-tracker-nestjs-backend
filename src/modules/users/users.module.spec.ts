import { UsersModule } from './users.module';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersEntity } from './users.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('UsersModule', () => {
  createModuleSpec<UsersController, UsersService>({
    module: UsersModule,
    controller: UsersController,
    service: UsersService,
    entity: UsersEntity,
  });
});
