import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentsEntity } from './comments.entity';

import { createControllerSpec } from '../../helpers/tests/createControllerSpec';

describe('CommentsController', () => {
  createControllerSpec<CommentsController>({
    controller: CommentsController,
    service: CommentsService,
    entity: CommentsEntity,
    entityName: 'comments',
  });
});
