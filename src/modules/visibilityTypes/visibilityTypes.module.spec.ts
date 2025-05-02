import { VisibilityTypesModule } from './visibilityTypes.module';
import { VisibilityTypesController } from './visibilityTypes.controller';
import { VisibilityTypesService } from './visibilityTypes.service';
import { VisibilityTypesEntity } from './visibilityTypes.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('VisibilityTypesModule', () => {
  createModuleSpec<VisibilityTypesController, VisibilityTypesService>({
    module: VisibilityTypesModule,
    controller: VisibilityTypesController,
    service: VisibilityTypesService,
    entity: VisibilityTypesEntity,
  });
});
