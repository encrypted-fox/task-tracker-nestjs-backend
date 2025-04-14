import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { ProjectEntity } from './projects.entity';

@Injectable()
export class ProjectsService extends BaseService {
  constructor(
    @InjectRepository(ProjectEntity)
    private projectsRepository: Repository<ProjectEntity>,
  ) {
    const relations = { creator: true };
    const searchFields = ['id', 'title', 'description'];

    super(projectsRepository, searchFields, relations);
  }
}
