import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { PrioritiesEntity } from './priorities.entity';

describe('PrioritiesEntity', () => {
  createEntityTests({
    entity: PrioritiesEntity,
    entityName: 'priorities',
    columns: ['id', 'title', 'value', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [],
  });
});
