import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { RolesService } from './roles.service';
import { RolesEntity } from './roles.entity';

describe('RolesService', () => {
  createServiceSpec<RolesService, RolesEntity>({
    service: RolesService,
    entity: RolesEntity,
    relations: { team: true },
    searchFields: ['id', 'title'],
  });
});
