import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { TaskDTO } from './tasks.entity';

@Injectable()
export class TasksService extends BaseService {
  constructor(
    @InjectRepository(TaskDTO)
    private tasksRepository: Repository<TaskDTO>,
  ) {
    super(tasksRepository);
  }
}
