import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('TasksController', () => {
  createControllerSpec<TasksController>({
    controller: TasksController,
    service: TasksService,
    entity: TasksEntity,
    entityName: 'tasks',
  });
});
