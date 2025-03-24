import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { Repository, UpdateResult } from 'typeorm';
import { formatISO } from 'date-fns';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }

  findOne(id: number): Promise<Project | null> {
    return this.projectsRepository.findOneBy({ id });
  }

  create(project: Project): Promise<Project> {
    const newUser = this.projectsRepository.create(project)

    return this.projectsRepository.save(newUser)
  }

  update(id: number, newProject: Project): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());
    
    return this.projectsRepository.update({ id }, {...newProject, updatedAt: updatedDate});
  }

  remove(id: number): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());
    
    return this.projectsRepository.update({ id }, { updatedAt: updatedDate, deletedAt: updatedDate });
  }
}