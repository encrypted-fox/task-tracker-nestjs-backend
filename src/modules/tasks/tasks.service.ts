import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../helpers/base/BaseService';
import { TasksEntity } from './tasks.entity';

@Injectable()
export class TasksService extends BaseService<TasksEntity> {
  constructor(
    @InjectRepository(TasksEntity)
    private tasksRepository: Repository<TasksEntity>,
  ) {
    const relations = {
      priority: true,
      tags: true,
      column: true,
      board: true,
      project: true,
      creator: true,
      visibility: true,
      relatedUsers: true,
    };
    const searchFields = ['id', 'title', 'description', 'estimate'];

    super(tasksRepository, searchFields, relations);
  }
}
