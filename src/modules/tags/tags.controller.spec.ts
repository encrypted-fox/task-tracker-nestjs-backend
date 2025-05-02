import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TagsEntity } from './tags.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('TagsController', () => {
  createControllerSpec<TagsController>({
    controller: TagsController,
    service: TagsService,
    entity: TagsEntity,
    entityName: 'tags',
  });
});
