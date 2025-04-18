import { Controller } from '@nestjs/common';
import { VisibilityEntity } from './visibilities.entity';
import { VisibilitiesService } from './visibilities.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/visibilities')
export class VisibilitiesController extends BaseController<
  VisibilityEntity,
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
