import { TagsModule } from './tags.module';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { TagsEntity } from './tags.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('TagsModule', () => {
  createModuleSpec<TagsController, TagsService>({
    module: TagsModule,
    controller: TagsController,
    service: TagsService,
    entity: TagsEntity,
  });
});
