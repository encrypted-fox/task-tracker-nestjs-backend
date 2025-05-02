import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { VisibilitiesEntity } from './visibilities.entity';

describe('VisibilitiesEntity', () => {
  createEntityTests({
    entity: VisibilitiesEntity,
    entityName: 'visibilities',
    columns: ['id', 'title', 'object', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [
      {
        name: 'visibilityType',
        relationType: 'many-to-one',
      },
    ],
  });
});
