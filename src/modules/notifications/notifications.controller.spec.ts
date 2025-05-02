import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationsEntity } from './notifications.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('NotificationsController', () => {
  createControllerSpec<NotificationsController>({
    controller: NotificationsController,
    service: NotificationsService,
    entity: NotificationsEntity,
    entityName: 'notifications',
  });
});
