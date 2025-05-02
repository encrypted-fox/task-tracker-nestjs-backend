import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsEntity } from './projects.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('ProjectsController', () => {
  createControllerSpec<ProjectsController>({
    controller: ProjectsController,
    service: ProjectsService,
    entity: ProjectsEntity,
    entityName: 'projects',
  });
});
