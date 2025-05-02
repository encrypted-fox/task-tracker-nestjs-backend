import { RelationTypesModule } from './relationTypes.module';
import { RelationTypesController } from './relationTypes.controller';
import { RelationTypesService } from './relationTypes.service';
import { RelationTypesEntity } from './relationTypes.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('RelationTypesModule', () => {
  createModuleSpec<RelationTypesController, RelationTypesService>({
    module: RelationTypesModule,
    controller: RelationTypesController,
    service: RelationTypesService,
    entity: RelationTypesEntity,
  });
});
