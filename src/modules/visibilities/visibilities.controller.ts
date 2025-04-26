import { Controller } from '@nestjs/common';
import { VisibilitiesEntity } from './visibilities.entity';
import { VisibilitiesService } from './visibilities.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/visibilities')
export class VisibilitiesController extends BaseController<
  VisibilitiesEntity,
  VisibilitiesService
> {
  constructor(private visibilitiesService: VisibilitiesService) {
    const visibilitiesFields = [
      'id',
      'title',
      'object',
      'visibilityType',
      'createdAt',
      'updatedAt',
      'deletedAt',
    ];

    super(visibilitiesFields, visibilitiesService);
  }
}
