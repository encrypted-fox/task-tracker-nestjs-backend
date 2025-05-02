import { TasksModule } from './tasks.module';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { TasksEntity } from './tasks.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('TasksModule', () => {
  createModuleSpec<TasksController, TasksService>({
    module: TasksModule,
    controller: TasksController,
    service: TasksService,
    entity: TasksEntity,
  });
});
