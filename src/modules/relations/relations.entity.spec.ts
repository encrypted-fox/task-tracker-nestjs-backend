import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { RelationsEntity } from './relations.entity';

describe('RelationsEntity', () => {
  createEntityTests({
    entity: RelationsEntity,
    entityName: 'relations',
    columns: ['id', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [
      {
        name: 'task',
        relationType: 'many-to-one',
      },
      {
        name: 'creator',
        relationType: 'many-to-one',
      },
      {
        name: 'relationType',
        relationType: 'many-to-one',
      },
      {
        name: 'relatedTasks',
        relationType: 'many-to-many',
      },
    ],
  });
});
