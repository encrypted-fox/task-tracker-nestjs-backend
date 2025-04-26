import { Controller } from '@nestjs/common';
import { RelationsEntity } from './relations.entity';
import { RelationsService } from './relations.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/relations')
export class RelationsController extends BaseController<
  RelationsEntity,
  RelationsService
> {
  constructor(private relationsService: RelationsService) {
    const relationsFields = [
      'id',
      'task',
      'relatedTasks',
      'type',
      'creator',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(relationsFields, relationsService);
  }
}
