import { ColumnsModule } from './columns.module';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { ColumnsEntity } from './columns.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('ColumnsModule', () => {
  createModuleSpec<ColumnsController, ColumnsService>({
    module: ColumnsModule,
    controller: ColumnsController,
    service: ColumnsService,
    entity: ColumnsEntity,
  });
});
