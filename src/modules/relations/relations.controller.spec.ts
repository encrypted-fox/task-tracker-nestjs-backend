import { RelationsController } from './relations.controller';
import { RelationsService } from './relations.service';
import { RelationsEntity } from './relations.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('RelationsController', () => {
  createControllerSpec<RelationsController>({
    controller: RelationsController,
    service: RelationsService,
    entity: RelationsEntity,
    entityName: 'relations',
  });
});
