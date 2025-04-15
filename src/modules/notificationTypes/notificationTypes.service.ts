import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { NotificationTypeEntity } from './notificationTypes.entity';

@Injectable()
export class NotificationTypesService extends BaseService {
  constructor(
    @InjectRepository(NotificationTypeEntity)
    private notificationTypesRepository: Repository<NotificationTypeEntity>,
  ) {
    const notifications = {};
    const searchFields = ['id', 'title'];

    super(notificationTypesRepository, searchFields, notifications);
  }
}
