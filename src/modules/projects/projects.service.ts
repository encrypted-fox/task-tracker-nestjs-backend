import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { ProjectsEntity } from './projects.entity';

@Injectable()
export class ProjectsService extends BaseService<ProjectsEntity> {
  constructor(
    @InjectRepository(ProjectsEntity)
    private projectsRepository: Repository<ProjectsEntity>,
  ) {
    const relations = { creator: true, visibility: true };
    const searchFields = ['id', 'title', 'description'];

    super(projectsRepository, searchFields, relations);
  }
}
