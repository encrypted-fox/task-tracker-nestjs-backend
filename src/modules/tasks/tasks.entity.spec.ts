import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { TasksEntity } from './tasks.entity';

describe('TasksEntity', () => {
  createEntityTests({
    entity: TasksEntity,
    entityName: 'tasks',
    columns: [
      'id',
      'title',
      'description',
      'estimate',
      'attachments',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    relations: [
      {
        name: 'priority',
        relationType: 'many-to-one',
      },
      {
        name: 'tags',
        relationType: 'many-to-many',
      },
      {
        name: 'column',
        relationType: 'many-to-one',
      },
      {
        name: 'board',
        relationType: 'many-to-one',
      },
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
      {
        name: 'relatedUsers',
        relationType: 'many-to-many',
      },
    ],
  });
});
