import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { ColumnsEntity } from './columns.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('ColumnsController', () => {
  createControllerSpec<ColumnsController>({
    controller: ColumnsController,
    service: ColumnsService,
    entity: ColumnsEntity,
    entityName: 'columns',
  });
});
