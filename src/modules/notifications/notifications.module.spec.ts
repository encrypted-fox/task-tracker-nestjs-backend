import { NotificationsModule } from './notifications.module';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { NotificationsEntity } from './notifications.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('NotificationsModule', () => {
  createModuleSpec<NotificationsController, NotificationsService>({
    module: NotificationsModule,
    controller: NotificationsController,
    service: NotificationsService,
    entity: NotificationsEntity,
  });
});
