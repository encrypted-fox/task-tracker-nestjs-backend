import { Controller } from '@nestjs/common';
import { CommentTypesEntity } from './commentTypes.entity';
import { CommentTypesService } from './commentTypes.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/commentTypes')
export class CommentTypesController extends BaseController<
  CommentTypesEntity,
  CommentTypesService
> {
  constructor(private commentTypesService: CommentTypesService) {
    const commentTypesFields = ['id', 'title'];

    super(commentTypesFields, commentTypesService);
  }
}
