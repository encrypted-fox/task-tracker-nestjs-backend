import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { RelationTypesService } from './relationTypes.service';
import { RelationTypesEntity } from './relationTypes.entity';

describe('RelationTypesService', () => {
  createServiceSpec<RelationTypesService, RelationTypesEntity>({
    service: RelationTypesService,
    entity: RelationTypesEntity,
    relations: {},
    searchFields: ['id', 'title'],
  });
});
