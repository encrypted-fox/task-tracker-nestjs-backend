import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { TagsService } from './tags.service';
import { TagsEntity } from './tags.entity';

describe('TagsService', () => {
  createServiceSpec<TagsService, TagsEntity>({
    service: TagsService,
    entity: TagsEntity,
    relations: {},
    searchFields: ['id', 'title'],
  });
});
