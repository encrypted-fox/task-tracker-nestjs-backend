import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { RulesService } from './rules.service';
import { RulesEntity } from './rules.entity';

describe('RulesService', () => {
  createServiceSpec<RulesService, RulesEntity>({
    service: RulesService,
    entity: RulesEntity,
    relations: { role: true },
    searchFields: ['id', 'title', 'value'],
  });
});
