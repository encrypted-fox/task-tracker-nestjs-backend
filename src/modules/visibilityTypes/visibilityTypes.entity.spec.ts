import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { VisibilityTypesEntity } from './visibilityTypes.entity';

describe('VisibilityTypesEntity', () => {
  createEntityTests({
    entity: VisibilityTypesEntity,
    entityName: 'visibility_types',
    columns: ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [],
  });
});
