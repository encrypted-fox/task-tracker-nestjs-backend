import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { TagsEntity } from './tags.entity';

describe('TagsEntity', () => {
  createEntityTests({
    entity: TagsEntity,
    entityName: 'tags',
    columns: ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [],
  });
});
