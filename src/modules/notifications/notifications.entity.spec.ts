import { createEntityTests } from '../../helpers/tests/createEntitySpec';
import { NotificationsEntity } from './notifications.entity';

describe('NotificationsEntity', () => {
  createEntityTests({
    entity: NotificationsEntity,
    entityName: 'notifications',
    columns: [
      'id',
      'title',
      'description',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ],
    relations: [
      {
        name: 'user',
        relationType: 'many-to-one',
      },
      {
        name: 'notificationType',
        relationType: 'many-to-one',
      },
    ],
  });
});
