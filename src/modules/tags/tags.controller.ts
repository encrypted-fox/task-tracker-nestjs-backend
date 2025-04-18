import { Controller } from '@nestjs/common';
import { TagEntity } from './tags.entity';
import { TagsService } from './tags.service';
import { BaseController } from '../../base/BaseController';

@Controller('api/tags')
export class TagsController extends BaseController<TagEntity, TagsService> {
  constructor(private tagsService: TagsService) {
    const tagsFields = ['id', 'title'];

    super(tagsFields, tagsService);
  }
}
