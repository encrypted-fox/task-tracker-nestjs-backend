import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { TaskEntity } from './tasks.entity';

@Injectable()
export class TasksService extends BaseService<TaskEntity> {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {
    const relations = {
      priority: true,
      tags: true,
      column: true,
      board: true,
      project: true,
      creator: true,
      relatedUsers: true,
    };
    const searchFields = ['id', 'title', 'description', 'estimate'];

    super(tasksRepository, searchFields, relations);
  }
}
