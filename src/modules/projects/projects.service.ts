import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProjectDTO } from './projects.entity';
import { Repository, UpdateResult } from 'typeorm';
import { formatISO } from 'date-fns';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectDTO)
    private projectsRepository: Repository<ProjectDTO>,
  ) {}

  findAll(): Promise<ProjectDTO[]> {
    return this.projectsRepository.find();
  }

  findOne(id: number): Promise<ProjectDTO | null> {
    return this.projectsRepository.findOneBy({ id });
  }

  create(project: ProjectDTO): Promise<ProjectDTO> {
    const newUser = this.projectsRepository.create(project);

    return this.projectsRepository.save(newUser);
  }

  update(id: number, newProject: ProjectDTO): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());

    return this.projectsRepository.update(
      { id },
      { ...newProject, updatedAt: updatedDate },
    );
  }

  remove(id: number): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());

    return this.projectsRepository.update(
      { id },
      { updatedAt: updatedDate, deletedAt: updatedDate },
    );
  }
}
