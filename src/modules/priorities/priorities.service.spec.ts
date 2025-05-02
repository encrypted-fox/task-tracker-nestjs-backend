import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { PrioritiesService } from './priorities.service';
import { PrioritiesEntity } from './priorities.entity';

describe('PrioritiesService', () => {
  createServiceSpec<PrioritiesService, PrioritiesEntity>({
    service: PrioritiesService,
    entity: PrioritiesEntity,
    relations: {},
    searchFields: ['id', 'title', 'value'],
  });
});
