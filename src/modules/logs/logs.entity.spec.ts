import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { LogsEntity } from './logs.entity';

describe('LogsEntity', () => {
  createEntityTests({
    entity: LogsEntity,
    entityName: 'logs',
    columns: [
      'id',
      'path',
      'action',
      'entity',
      'object',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    relations: [
      {
        name: 'creator',
        relationType: 'many-to-one',
      },
    ],
  });
});
