import { Controller } from '@nestjs/common';
import { PrioritiesEntity } from './priorities.entity';
import { PrioritiesService } from './priorities.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/priorities')
export class PrioritiesController extends BaseController<
  PrioritiesEntity,
  PrioritiesService
> {
  constructor(private prioritiesService: PrioritiesService) {
    const prioritiesFields = [
      'id',
      'title',
      'value',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(prioritiesFields, prioritiesService);
  }
}
