import { TeamsModule } from './teams.module';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { TeamsEntity } from './teams.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('TeamsModule', () => {
  createModuleSpec<TeamsController, TeamsService>({
    module: TeamsModule,
    controller: TeamsController,
    service: TeamsService,
    entity: TeamsEntity,
  });
});
