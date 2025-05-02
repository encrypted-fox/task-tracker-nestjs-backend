import { RulesController } from './rules.controller';
import { RulesService } from './rules.service';
import { RulesEntity } from './rules.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('RulesController', () => {
  createControllerSpec<RulesController>({
    controller: RulesController,
    service: RulesService,
    entity: RulesEntity,
    entityName: 'rules',
  });
});
