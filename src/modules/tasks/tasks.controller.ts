import { Controller } from '@nestjs/common';
import { TasksEntity } from './tasks.entity';
import { TasksService } from './tasks.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/tasks')
export class TasksController extends BaseController<TasksEntity, TasksService> {
  constructor(private tasksService: TasksService) {
    const tasksFields = [
      'id',
      'title',
      'description',
      'estimate',
      'column',
      'priority',
      'attachments',
      'tags',
      'board',
      'project',
      'creator',
      'visibility',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(tasksFields, tasksService);
  }
}
