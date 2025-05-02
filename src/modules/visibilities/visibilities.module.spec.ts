import { VisibilitiesModule } from './visibilities.module';
import { VisibilitiesController } from './visibilities.controller';
import { VisibilitiesService } from './visibilities.service';
import { VisibilitiesEntity } from './visibilities.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('VisibilitiesModule', () => {
  createModuleSpec<VisibilitiesController, VisibilitiesService>({
    module: VisibilitiesModule,
    controller: VisibilitiesController,
    service: VisibilitiesService,
    entity: VisibilitiesEntity,
  });
});
