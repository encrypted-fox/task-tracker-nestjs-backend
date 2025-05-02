import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { BoardsEntity } from './boards.entity';

describe('BoardsEntity', () => {
  createEntityTests({
    entity: BoardsEntity,
    entityName: 'boards',
    columns: [
      'id',
      'title',
      'description',
      'attachments',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    relations: [
      {
        name: 'project',
        relationType: 'many-to-one',
      },
      {
        name: 'creator',
        relationType: 'many-to-one',
      },
      {
        name: 'visibility',
        relationType: 'many-to-one',
      },
    ],
  });
});
