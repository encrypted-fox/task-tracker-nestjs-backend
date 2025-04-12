import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskDTO } from './tasks.entity';
import { Repository, UpdateResult } from 'typeorm';
import { formatISO } from 'date-fns';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskDTO)
    private tasksRepository: Repository<TaskDTO>,
  ) {}

  findAll(): Promise<TaskDTO[]> {
    return this.tasksRepository.find();
  }

  findOne(id: number): Promise<TaskDTO | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  create(user: TaskDTO): Promise<TaskDTO> {
    const newTask = this.tasksRepository.create(user);

    return this.tasksRepository.save(newTask);
  }

  update(id: number, newTask: TaskDTO): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());

    return this.tasksRepository.update(
      { id },
      { ...newTask, updatedAt: updatedDate },
    );
  }

  remove(id: number): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());

    return this.tasksRepository.update(
      { id },
      { updatedAt: updatedDate, deletedAt: updatedDate },
    );
  }
}
