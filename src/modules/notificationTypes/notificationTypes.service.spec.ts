import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { NotificationTypesService } from './notificationTypes.service';
import { NotificationTypesEntity } from './notificationTypes.entity';

describe('NotificationTypesService', () => {
  createServiceSpec<NotificationTypesService, NotificationTypesEntity>({
    service: NotificationTypesService,
    entity: NotificationTypesEntity,
    relations: {},
    searchFields: ['id', 'title'],
  });
});
