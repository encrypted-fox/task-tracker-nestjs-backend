import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { ProjectDTO } from './projects.entity';

@Injectable()
export class ProjectsService extends BaseService {
  constructor(
    @InjectRepository(ProjectDTO)
    private projectsRepository: Repository<ProjectDTO>,
  ) {
    super(projectsRepository);
  }
}
