import { createServiceSpec } from '../../helpers/tests/createServiceSpec';
import { CommentsService } from './comments.service';
import { CommentsEntity } from './comments.entity';

describe('CommentsService', () => {
  createServiceSpec<CommentsService, CommentsEntity>({
    service: CommentsService,
    entity: CommentsEntity,
    relations: { creator: true, task: true, commentType: true },
    searchFields: ['id', 'description'],
  });
});
