import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { VisibilitiesService } from './visibilities.service';
import { VisibilitiesEntity } from './visibilities.entity';

describe('VisibilitiesService', () => {
  createServiceSpec<VisibilitiesService, VisibilitiesEntity>({
    service: VisibilitiesService,
    entity: VisibilitiesEntity,
    relations: { visibilityType: true },
    searchFields: ['id', 'title'],
  });
});
