import { NotificationTypesController } from './notificationTypes.controller';
import { NotificationTypesService } from './notificationTypes.service';
import { NotificationTypesEntity } from './notificationTypes.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('NotificationTypesController', () => {
  createControllerSpec<NotificationTypesController>({
    controller: NotificationTypesController,
    service: NotificationTypesService,
    entity: NotificationTypesEntity,
    entityName: 'notificationTypes',
  });
});
