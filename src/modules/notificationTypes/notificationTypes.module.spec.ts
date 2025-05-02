import { NotificationTypesModule } from './notificationTypes.module';
import { NotificationTypesController } from './notificationTypes.controller';
import { NotificationTypesService } from './notificationTypes.service';
import { NotificationTypesEntity } from './notificationTypes.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('NotificationTypesModule', () => {
  createModuleSpec<NotificationTypesController, NotificationTypesService>({
    module: NotificationTypesModule,
    controller: NotificationTypesController,
    service: NotificationTypesService,
    entity: NotificationTypesEntity,
  });
});
