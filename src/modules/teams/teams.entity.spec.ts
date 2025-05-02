import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { TeamsEntity } from './teams.entity';

describe('TeamsEntity', () => {
  createEntityTests({
    entity: TeamsEntity,
    entityName: 'teams',
    columns: ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [
      {
        name: 'creator',
        relationType: 'many-to-one',
      },
    ],
  });
});
