import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { RelationsService } from './relations.service';
import { RelationsEntity } from './relations.entity';

describe('RelationsService', () => {
  createServiceSpec<RelationsService, RelationsEntity>({
    service: RelationsService,
    entity: RelationsEntity,
    relations: {
      task: true,
      relatedTasks: true,
      relationType: true,
      creator: true,
    },
    searchFields: ['id'],
  });
});
