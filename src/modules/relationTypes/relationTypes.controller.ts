import { Controller } from '@nestjs/common';
import { RelationTypeEntity } from './relationTypes.entity';
import { RelationTypesService } from './relationTypes.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/relationTypes')
export class RelationTypesController extends BaseController<
  RelationTypeEntity,
  RelationTypesService
> {
  constructor(private relationTypesService: RelationTypesService) {
    const relationTypesFields = ['id', 'title'];

    super(relationTypesFields, relationTypesService);
  }
}
