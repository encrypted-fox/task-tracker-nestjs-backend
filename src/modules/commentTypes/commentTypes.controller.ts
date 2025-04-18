import { Controller } from '@nestjs/common';
import { CommentTypeEntity } from './commentTypes.entity';
import { CommentTypesService } from './commentTypes.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/commentTypes')
export class CommentTypesController extends BaseController<
  CommentTypeEntity,
  CommentTypesService
> {
  constructor(private commentTypesService: CommentTypesService) {
    const commentTypesFields = ['id', 'title'];

    super(commentTypesFields, commentTypesService);
  }
}
