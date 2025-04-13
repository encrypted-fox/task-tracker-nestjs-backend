import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { TaskEntity } from './tasks.entity';

@Injectable()
export class TasksService extends BaseService {
  constructor(
    @InjectRepository(TaskEntity)
    private tasksRepository: Repository<TaskEntity>,
  ) {
    super(tasksRepository);
  }
}
