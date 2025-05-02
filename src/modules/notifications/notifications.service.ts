import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../helpers/base/BaseService';
import { NotificationsEntity } from './notifications.entity';

@Injectable()
export class NotificationsService extends BaseService<NotificationsEntity> {
  constructor(
    @InjectRepository(NotificationsEntity)
    private notificationsRepository: Repository<NotificationsEntity>,
  ) {
    const relations = { user: true, notificationType: true };
    const searchFields = ['id', 'title', 'description'];

    super(notificationsRepository, searchFields, relations);
  }
}
