import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { RulesEntity } from './rules.entity';

describe('RulesEntity', () => {
  createEntityTests({
    entity: RulesEntity,
    entityName: 'rules',
    columns: ['id', 'title', 'value', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [
      {
        name: 'role',
        relationType: 'many-to-one',
      },
    ],
  });
});
