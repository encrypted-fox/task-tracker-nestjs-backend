import { PrioritiesModule } from './priorities.module';
import { PrioritiesController } from './priorities.controller';
import { PrioritiesService } from './priorities.service';
import { PrioritiesEntity } from './priorities.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('PrioritiesModule', () => {
  createModuleSpec<PrioritiesController, PrioritiesService>({
    module: PrioritiesModule,
    controller: PrioritiesController,
    service: PrioritiesService,
    entity: PrioritiesEntity,
  });
});
