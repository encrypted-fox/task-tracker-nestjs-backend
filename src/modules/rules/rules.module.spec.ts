import { RulesModule } from './rules.module';
import { RulesController } from './rules.controller';
import { RulesService } from './rules.service';
import { RulesEntity } from './rules.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('RulesModule', () => {
  createModuleSpec<RulesController, RulesService>({
    module: RulesModule,
    controller: RulesController,
    service: RulesService,
    entity: RulesEntity,
  });
});
