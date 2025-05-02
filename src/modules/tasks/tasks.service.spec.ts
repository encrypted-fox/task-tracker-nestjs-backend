import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';

describe('TasksService', () => {
  createServiceSpec<TasksService, TasksEntity>({
    service: TasksService,
    entity: TasksEntity,
    relations: {
      priority: true,
      tags: true,
      column: true,
      board: true,
      project: true,
      creator: true,
      visibility: true,
      relatedUsers: true,
    },
    searchFields: ['id', 'title', 'description', 'estimate'],
  });
});
