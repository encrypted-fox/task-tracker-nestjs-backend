import { PrioritiesController } from './priorities.controller';
import { PrioritiesService } from './priorities.service';
import { PrioritiesEntity } from './priorities.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('PrioritiesController', () => {
  createControllerSpec<PrioritiesController>({
    controller: PrioritiesController,
    service: PrioritiesService,
    entity: PrioritiesEntity,
    entityName: 'priorities',
  });
});
