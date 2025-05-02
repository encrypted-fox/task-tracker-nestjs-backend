import { RelationsModule } from './relations.module';
import { RelationsController } from './relations.controller';
import { RelationsService } from './relations.service';
import { RelationsEntity } from './relations.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('RelationsModule', () => {
  createModuleSpec<RelationsController, RelationsService>({
    module: RelationsModule,
    controller: RelationsController,
    service: RelationsService,
    entity: RelationsEntity,
  });
});
