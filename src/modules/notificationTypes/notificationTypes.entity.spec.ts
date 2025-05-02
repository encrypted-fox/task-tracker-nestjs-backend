import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { NotificationTypesEntity } from './notificationTypes.entity';

describe('NotificationTypesEntity', () => {
  createEntityTests({
    entity: NotificationTypesEntity,
    entityName: 'notification_types',
    columns: ['id', 'title', 'createdAt', 'updatedAt', 'deletedAt'],
    relations: [],
  });
});
