import { VisibilitiesController } from './visibilities.controller';
import { VisibilitiesService } from './visibilities.service';
import { VisibilitiesEntity } from './visibilities.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('VisibilitiesController', () => {
  createControllerSpec<VisibilitiesController>({
    controller: VisibilitiesController,
    service: VisibilitiesService,
    entity: VisibilitiesEntity,
    entityName: 'visibilities',
  });
});
