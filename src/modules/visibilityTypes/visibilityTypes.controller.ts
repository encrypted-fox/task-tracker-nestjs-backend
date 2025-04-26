import { Controller } from '@nestjs/common';
import { VisibilityTypesEntity } from './visibilityTypes.entity';
import { VisibilityTypesService } from './visibilityTypes.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/visibilityTypes')
export class VisibilityTypesController extends BaseController<
  VisibilityTypesEntity,
  VisibilityTypesService
> {
  constructor(private visibilityTypesService: VisibilityTypesService) {
    const visibilityTypesFields = ['id', 'title'];

    super(visibilityTypesFields, visibilityTypesService);
  }
}
