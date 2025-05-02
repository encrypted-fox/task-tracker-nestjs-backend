import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { ProjectsService } from './projects.service';
import { ProjectsEntity } from './projects.entity';

describe('ProjectsService', () => {
  createServiceSpec<ProjectsService, ProjectsEntity>({
    service: ProjectsService,
    entity: ProjectsEntity,
    relations: { creator: true, visibility: true },
    searchFields: ['id', 'title', 'description'],
  });
});
