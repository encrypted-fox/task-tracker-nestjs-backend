import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamsEntity } from './teams.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('TeamsController', () => {
  createControllerSpec<TeamsController>({
    controller: TeamsController,
    service: TeamsService,
    entity: TeamsEntity,
    entityName: 'teams',
  });
});
