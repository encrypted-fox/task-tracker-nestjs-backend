import { CommentsModule } from './comments.module';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsEntity } from './comments.entity';

import { createModuleSpec } from '../../helpers/tests/createModuleSpec';

describe('CommentsModule', () => {
  createModuleSpec<CommentsController, CommentsService>({
    module: CommentsModule,
    controller: CommentsController,
    service: CommentsService,
    entity: CommentsEntity,
  });
});
