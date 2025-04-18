import { Controller } from '@nestjs/common';
import { ProjectEntity } from './projects.entity';
import { ProjectsService } from './projects.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/projects')
export class ProjectsController extends BaseController<
  ProjectEntity,
  ProjectsService
> {
  constructor(private projectsService: ProjectsService) {
    const projectsFields = [
      'id',
      'title',
      'description',
      'attachments',
      'creator',
      'visibility',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];
    super(projectsFields, projectsService);
  }
}
