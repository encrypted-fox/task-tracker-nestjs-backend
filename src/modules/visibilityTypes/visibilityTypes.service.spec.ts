import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { VisibilityTypesService } from './visibilityTypes.service';
import { VisibilityTypesEntity } from './visibilityTypes.entity';

describe('VisibilityTypesService', () => {
  createServiceSpec<VisibilityTypesService, VisibilityTypesEntity>({
    service: VisibilityTypesService,
    entity: VisibilityTypesEntity,
    relations: {},
    searchFields: ['id', 'title'],
  });
});
