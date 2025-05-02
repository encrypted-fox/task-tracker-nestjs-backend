import { VisibilityTypesController } from './visibilityTypes.controller';
import { VisibilityTypesService } from './visibilityTypes.service';
import { VisibilityTypesEntity } from './visibilityTypes.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('VisibilityTypesController', () => {
  createControllerSpec<VisibilityTypesController>({
    controller: VisibilityTypesController,
    service: VisibilityTypesService,
    entity: VisibilityTypesEntity,
    entityName: 'visibilityTypes',
  });
});
