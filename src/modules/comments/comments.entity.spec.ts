import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { CommentsEntity } from './comments.entity';

describe('CommentsEntity', () => {
  createEntityTests({
    entity: CommentsEntity,
    entityName: 'comments',
    columns: [
      'id',
      'description',
      'attachments',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    relations: [
      {
        name: 'commentType',
        relationType: 'many-to-one',
      },
      {
        name: 'task',
        relationType: 'many-to-one',
      },
      {
        name: 'creator',
        relationType: 'many-to-one',
      },
    ],
  });
});
