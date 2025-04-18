import { Controller } from '@nestjs/common';
import { NotificationTypeEntity } from './notificationTypes.entity';
import { NotificationTypesService } from './notificationTypes.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/notificationTypes')
export class NotificationTypesController extends BaseController<
  NotificationTypeEntity,
  NotificationTypesService
> {
  constructor(private notificationTypesService: NotificationTypesService) {
    const notificationTypesFields = ['id', 'title'];

    super(notificationTypesFields, notificationTypesService);
  }
}
