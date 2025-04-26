import { Controller } from '@nestjs/common';
import { NotificationsEntity } from './notifications.entity';
import { NotificationsService } from './notifications.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/notifications')
export class NotificationsController extends BaseController<
  NotificationsEntity,
  NotificationsService
> {
  constructor(private notificationsService: NotificationsService) {
    const notificationsFields = [
      'id',
      'title',
      'description',
      'user',
      'type',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(notificationsFields, notificationsService);
  }
}
