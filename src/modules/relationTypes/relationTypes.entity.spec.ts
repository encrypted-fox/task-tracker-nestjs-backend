import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { RelationTypesEntity } from './relationTypes.entity';

describe('RelationTypesEntity', () => {
  createEntityTests({
    entity: RelationTypesEntity,
    entityName: 'relation_types',
    columns: ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [],
  });
});
