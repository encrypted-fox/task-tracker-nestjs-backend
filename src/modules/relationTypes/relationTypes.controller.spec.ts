import { RelationTypesController } from './relationTypes.controller';
import { RelationTypesService } from './relationTypes.service';
import { RelationTypesEntity } from './relationTypes.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('RelationTypesController', () => {
  createControllerSpec<RelationTypesController>({
    controller: RelationTypesController,
    service: RelationTypesService,
    entity: RelationTypesEntity,
    entityName: 'relationTypes',
  });
});
