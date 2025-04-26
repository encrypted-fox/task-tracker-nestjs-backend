import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { LogsEntity } from './logs.entity';

@Injectable()
export class LogsService extends BaseService<LogsEntity> {
  constructor(
    @InjectRepository(LogsEntity)
    private logsRepository: Repository<LogsEntity>,
  ) {
    const relations = { project: true, creator: true };
    const searchFields = ['title', 'action'];

    super(logsRepository, searchFields, relations);
  }
}
