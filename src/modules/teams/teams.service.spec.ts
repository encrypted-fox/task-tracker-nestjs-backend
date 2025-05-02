import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { TeamsService } from './teams.service';
import { TeamsEntity } from './teams.entity';

describe('TeamsService', () => {
  createServiceSpec<TeamsService, TeamsEntity>({
    service: TeamsService,
    entity: TeamsEntity,
    relations: { creator: true },
    searchFields: ['id', 'title'],
  });
});
