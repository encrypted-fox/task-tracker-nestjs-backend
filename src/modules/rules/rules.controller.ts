import { Controller } from '@nestjs/common';
import { RulesEntity } from './rules.entity';
import { RulesService } from './rules.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/rules')
export class RulesController extends BaseController<RulesEntity, RulesService> {
  constructor(private rulesService: RulesService) {
    const rulesFields = [
      'id',
      'title',
      'value',
      'role',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(rulesFields, rulesService);
  }
}
