import { Controller } from '@nestjs/common';
import { RelationTypesEntity } from './relationTypes.entity';
import { RelationTypesService } from './relationTypes.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/relationTypes')
export class RelationTypesController extends BaseController<
  RelationTypesEntity,
  RelationTypesService
> {
  constructor(private relationTypesService: RelationTypesService) {
    const relationTypesFields = ['id', 'title'];

    super(relationTypesFields, relationTypesService);
  }
}
