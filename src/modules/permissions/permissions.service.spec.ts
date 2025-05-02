import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { PermissionsService } from './permissions.service';
import { PermissionsEntity } from './permissions.entity';

describe('PermissionsService', () => {
  createServiceSpec<PermissionsService, PermissionsEntity>({
    service: PermissionsService,
    entity: PermissionsEntity,
    relations: { role: true },
    searchFields: ['id', 'title', 'value'],
  });
});
