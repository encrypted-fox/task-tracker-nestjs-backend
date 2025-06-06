import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseService } from '../../helpers/base/BaseService';
import { NotificationTypesEntity } from './notificationTypes.entity';

@Injectable()
export class NotificationTypesService extends BaseService<NotificationTypesEntity> {
  constructor(
    @InjectRepository(NotificationTypesEntity)
    private notificationTypesRepository: Repository<NotificationTypesEntity>,
  ) {
    const relations = {};
    const searchFields = ['id', 'title'];

    super(notificationTypesRepository, searchFields, relations);
  }
}
