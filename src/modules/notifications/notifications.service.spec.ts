import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { NotificationsService } from './notifications.service';
import { NotificationsEntity } from './notifications.entity';

describe('NotificationsService', () => {
  createServiceSpec<NotificationsService, NotificationsEntity>({
    service: NotificationsService,
    entity: NotificationsEntity,
    relations: { user: true, notificationType: true },
    searchFields: ['id', 'title', 'description'],
  });
});
