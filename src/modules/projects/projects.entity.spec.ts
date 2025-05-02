import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { ProjectsEntity } from './projects.entity';

describe('ProjectsEntity', () => {
  createEntityTests({
    entity: ProjectsEntity,
    entityName: 'projects',
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
