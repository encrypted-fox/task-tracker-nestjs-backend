import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './tasks.entity';
import { Repository, UpdateResult } from 'typeorm';
import { formatISO } from 'date-fns';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: number): Promise<Task | null> {
    return this.tasksRepository.findOneBy({ id });
  }

  create(user: Task): Promise<Task> {
    const newTask = this.tasksRepository.create(user)

    return this.tasksRepository.save(newTask)
  }

  update(id: number, newTask: Task): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());
    
    return this.tasksRepository.update({ id }, {...newTask, updatedAt: updatedDate});
  }

  remove(id: number): Promise<UpdateResult> {
    const updatedDate = formatISO(new Date());
    
    return this.tasksRepository.update({ id }, { updatedAt: updatedDate, deletedAt: updatedDate });
  }
}