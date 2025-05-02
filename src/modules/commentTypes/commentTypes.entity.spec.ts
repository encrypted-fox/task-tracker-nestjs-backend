import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { CommentTypesEntity } from './commentTypes.entity';

describe('CommentTypesEntity', () => {
  createEntityTests({
    entity: CommentTypesEntity,
    entityName: 'comment_types',
    columns: ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [],
  });
});
