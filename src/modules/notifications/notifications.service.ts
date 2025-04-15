import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../base/BaseService';
import { NotificationEntity } from './notifications.entity';

@Injectable()
export class NotificationsService extends BaseService {
  constructor(
    @InjectRepository(NotificationEntity)
    private notificationsRepository: Repository<NotificationEntity>,
  ) {
    const relations = { user: true, notificationType: true };
    const searchFields = ['id', 'title', 'description'];

    super(notificationsRepository, searchFields, relations);
  }
}
