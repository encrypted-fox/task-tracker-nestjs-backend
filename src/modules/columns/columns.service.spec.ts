import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { ColumnsService } from './columns.service';
import { ColumnsEntity } from './columns.entity';

describe('ColumnsService', () => {
  createServiceSpec<ColumnsService, ColumnsEntity>({
    service: ColumnsService,
    entity: ColumnsEntity,
    relations: { project: true, board: true, creator: true },
    searchFields: ['id', 'title'],
  });
});
