import { ProjectsModule } from './projects.module';
import { ProjectsController } from './projects.controller';
import { ProjectsService } from './projects.service';
import { ProjectsEntity } from './projects.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('ProjectsModule', () => {
  createModuleSpec<ProjectsController, ProjectsService>({
    module: ProjectsModule,
    controller: ProjectsController,
    service: ProjectsService,
    entity: ProjectsEntity,
  });
});
