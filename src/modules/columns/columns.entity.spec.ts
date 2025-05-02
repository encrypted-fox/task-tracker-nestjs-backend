import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { ColumnsEntity } from './columns.entity';

describe('ColumnsEntity', () => {
  createEntityTests({
    entity: ColumnsEntity,
    entityName: 'columns',
    columns: ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [
      {
        name: 'board',
        relationType: 'many-to-one',
      },
      {
        name: 'project',
        relationType: 'many-to-one',
      },
      {
        name: 'creator',
        relationType: 'many-to-one',
      },
    ],
  });
});
